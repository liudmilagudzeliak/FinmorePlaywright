import fs from 'fs';
 
type TestCase = {
  title: string;
  project: string;
  status: string;
  duration: number;
  retries: number;
  error?: string;
};
 
const results = JSON.parse(
  fs.readFileSync('test-results/results.json', 'utf-8')
);
 
const tests: TestCase[] = [];
 
function walkSuites(suites: any[]) {
  for (const suite of suites || []) {
    walkSuites(suite.suites || []);
 
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const project = test.projectName;
 
        for (const result of test.results || []) {
          tests.push({
            title: spec.title,
            project,
            status: result.status,
            duration: result.duration || 0,
            retries: result.retry || 0,
            error: result.error?.message,
          });
        }
      }
    }
  }
}
 
walkSuites(results.suites);
 
const latestResults = new Map<string, TestCase>();
 
for (const test of tests) {
  const key = `${test.project}-${test.title}`;
  latestResults.set(key, test);
}
 
const finalTests = [...latestResults.values()];
 
const passed = finalTests.filter(t => t.status === 'passed').length;
const failed = finalTests.filter(t => t.status === 'failed').length;
const skipped = finalTests.filter(t => t.status === 'skipped').length;
 
const flaky = finalTests.filter(
  t => t.status === 'passed' && t.retries > 0
).length;
 
const total = finalTests.length;
 
const successRate = (
  ((passed + flaky) / total) *
  100
).toFixed(1);
 
const durationMs = finalTests.reduce(
  (acc, t) => acc + t.duration,
  0
);
 
const durationMin = (durationMs / 1000 / 60).toFixed(2);
 
const browserStats: Record<string, number> = {};
 
for (const test of finalTests) {
  browserStats[test.project] =
    (browserStats[test.project] || 0) + 1;
}
 
const failedTests = finalTests
  .filter(t => t.status === 'failed')
  .slice(0, 10);
 
const slowTests = [...finalTests]
  .sort((a, b) => b.duration - a.duration)
  .slice(0, 5);
 
const githubRunUrl =
  `${process.env.GITHUB_SERVER_URL}/` +
  `${process.env.GITHUB_REPOSITORY}/actions/runs/` +
  `${process.env.GITHUB_RUN_ID}`;
 
const htmlReportUrl =
  `${githubRunUrl}#artifacts`;
 
const color =
  failed > 0
    ? '#ff4d4f'
    : flaky > 0
    ? '#faad14'
    : '#52c41a';
 
const payload = {
  attachments: [
    {
      color,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text:
              failed > 0
                ? '❌ Playwright Tests Failed'
                : '✅ Playwright Tests Passed',
          },
        },
 
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Total*\n${total}`,
            },
            {
              type: 'mrkdwn',
              text: `*Success Rate*\n${successRate}%`,
            },
            {
              type: 'mrkdwn',
              text: `*Passed*\n✅ ${passed}`,
            },
            {
              type: 'mrkdwn',
              text: `*Failed*\n❌ ${failed}`,
            },
            {
              type: 'mrkdwn',
              text: `*Flaky*\n🔁 ${flaky}`,
            },
            {
              type: 'mrkdwn',
              text: `*Skipped*\n⏭ ${skipped}`,
            },
            {
              type: 'mrkdwn',
              text: `*Duration*\n⏱ ${durationMin} min`,
            },
          ],
        },
 
        {
          type: 'divider',
        },
 
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*🌐 Browser Distribution*\n' +
              Object.entries(browserStats)
                .map(
                  ([browser, count]) =>
                    `• ${browser}: ${count}`
                )
                .join('\n'),
          },
        },
 
        {
          type: 'divider',
        },
 
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*🔥 Slowest Tests*\n' +
              slowTests
                .map(
                  t =>
                    `• ${t.title} — ${(t.duration / 1000).toFixed(1)}s`
                )
                .join('\n'),
          },
        },
 
        ...(failedTests.length > 0
          ? [
              {
                type: 'divider',
              },
 
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text:
                    '*❌ Failed Tests*\n' +
                    failedTests
                      .map(
                        t =>
                          `• ${t.title}\n_${t.error?.slice(0, 120) || 'Error'}_`
                      )
                      .join('\n\n'),
                },
              },
            ]
          : []),
 
        {
          type: 'divider',
        },
 
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'GitHub Run',
              },
              url: githubRunUrl,
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'HTML Report',
              },
              url: htmlReportUrl,
            },
          ],
        },
      ],
    },
  ],
};
 
async function send() {
  const response = await fetch(
    process.env.SLACK_WEBHOOK_URL!,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
 
  if (!response.ok) {
    throw new Error(
      `Slack API error: ${response.status}`
    );
  }
}
 
send();