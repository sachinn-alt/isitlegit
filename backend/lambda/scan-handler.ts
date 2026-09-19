import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

interface ScanRequest {
  input: string;
  type: 'url' | 'email' | 'text';
}

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });

export const handler = async (event: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body: ScanRequest = JSON.parse(event.body || '{}');
    if (!body.input) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing input parameter' }),
      };
    }

    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `Analyze this content for phishing or legitimacy:\n\n${body.input}`,
        },
      ],
      temperature: 0.1,
    };

    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const decoded = new TextDecoder().decode(response.body);

    return {
      statusCode: 200,
      headers,
      body: decoded,
    };
  } catch (err: any) {
    console.error('Lambda scan execution failed:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};
