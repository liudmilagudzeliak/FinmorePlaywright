import fs from 'fs';
 
const results = JSON.parse(
  fs.readFileSync('test-results/results.json', 'utf-8')
);
 
let passed = 0;
let failed = 0;
let skipped = 0;
 
function parseSuites(suites: any[]) {
  for (const suite of suites || []) {
    parseSuites(suite.suites);
 
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        for (const result of test.results || []) {
          if (result.status === 'passed') passed++;
          if (result.status === 'failed') failed++;
          if (result.status === 'skipped') skipped++;
        }
      }
    }
  }
}
 
parseSuites(results.suites);
 
const total = passed + failed + skipped;
 
const githubRunUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
 
const payload = {
  text: `Playwright Test Results`,
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🎭 Playwright Results',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `✅ *Passed:* ${passed}`,
        },
        {
          type: 'mrkdwn',
          text: `❌ *Failed:* ${failed}`,
        },
        {
          type: 'mrkdwn',
          text: `⏭ *Skipped:* ${skipped}`,
        },
        {
          type: 'mrkdwn',
          text: `📊 *Total:* ${total}`,
        },
      ],
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `🔗 <${githubRunUrl}|Open GitHub Actions Run>`,
      },
    },
  ],
};
 
async function send() {
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
 
send();
 