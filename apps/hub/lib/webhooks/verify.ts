import { createHmac, timingSafeEqual } from 'crypto';

export function verifyGitHubWebhook(payload: string, signature: string, secret: string): boolean {
  if (!signature || !signature.startsWith('sha256=')) {
    return false;
  }
  
  const hmac = createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  
  // Use timing-safe comparison
  return digest.length === signature.length && 
         timingSafeEqual(
           Buffer.from(digest),
           Buffer.from(signature)
         );
}

export function getWebhookSecret(): string {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('GITHUB_WEBHOOK_SECRET environment variable is not set');
  }
  return secret;
}

