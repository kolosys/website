import { NextRequest, NextResponse } from "next/server";
import { verifyGitHubWebhook, getWebhookSecret } from "@/lib/webhooks/verify";
import {
  handlePushEvent,
  handleIssuesEvent,
  handlePullRequestEvent,
  handleReleaseEvent,
  handleMemberEvent,
  handleRepositoryEvent,
  handleCreateEvent,
  handleDeleteEvent,
} from "@/lib/webhooks/handlers";

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get("x-hub-signature-256");
    const event = request.headers.get("x-github-event");

    if (!signature || !event) {
      return NextResponse.json(
        { error: "Missing required headers" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const secret = getWebhookSecret();
    const isValid = verifyGitHubWebhook(body, signature, secret);

    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the payload
    const payload = JSON.parse(body);

    console.log(`\n🎯 Received ${event} webhook from GitHub`);

    // Handle different event types
    try {
      switch (event) {
        case "push":
          await handlePushEvent(payload);
          break;

        case "issues":
          await handleIssuesEvent(payload);
          break;

        case "pull_request":
          await handlePullRequestEvent(payload);
          break;

        case "release":
          await handleReleaseEvent(payload);
          break;

        case "member":
        case "membership":
          await handleMemberEvent(payload);
          break;

        case "repository":
          await handleRepositoryEvent(payload);
          break;

        case "create":
          await handleCreateEvent(payload);
          break;

        case "delete":
          await handleDeleteEvent(payload);
          break;

        case "ping":
          console.log(
            "📡 Ping event received - webhook is configured correctly"
          );
          break;

        case "workflow_job":
        case "workflow_run":
        case "check_run":
          // Skip these events for now
          break;

        default:
          console.log(`⚠️  Unhandled event type: ${event}`);
      }

      return NextResponse.json({ success: true, event });
    } catch (handlerError: any) {
      console.error(`Error handling ${event} event:`, handlerError);
      // Return 200 to acknowledge receipt even if processing failed
      // This prevents GitHub from retrying unnecessarily
      return NextResponse.json(
        { success: false, error: handlerError.message, event },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Support GET for testing
export async function GET() {
  return NextResponse.json({
    message: "GitHub webhook endpoint",
    status: "ready",
    supportedEvents: [
      "push",
      "issues",
      "pull_request",
      "release",
      "member",
      "membership",
      "repository",
      "create",
      "delete",
      "ping",
    ],
  });
}
