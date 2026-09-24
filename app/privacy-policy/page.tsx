import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Ticmark Properties collects, uses and protects personal information shared through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const { email } = siteConfig.contact;
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="To be confirmed">
      <p>
        This Privacy Policy explains how Ticmark Properties (&quot;we&quot;, &quot;us&quot;) handles personal information that you share
        when you use this website, submit an inquiry or subscribe to updates.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you provide, such as your name, phone number and email address.</li>
        <li>Details of your inquiry, such as the projects, areas or property types you are interested in.</li>
        <li>Basic technical information collected automatically, such as browser type and pages visited.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your inquiries and provide the property information you request.</li>
        <li>To send project updates and market information if you have subscribed to them.</li>
        <li>To improve our website and services.</li>
      </ul>

      <h2>Sharing your information</h2>
      <p>
        We do not sell your personal information. We may share relevant details with developers or service providers only where needed to
        respond to your inquiry, or where required by law.
      </p>

      <h2>Third-party services</h2>
      <p>
        This website embeds content from third parties, such as YouTube videos and maps. These services may collect information in line with
        their own privacy policies.
      </p>

      <h2>Data retention and security</h2>
      <p>We keep personal information only as long as needed for the purposes above and take reasonable steps to protect it.</p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete your personal information, or unsubscribe from updates at any time, by emailing{" "}
        <a href={`mailto:${email}`} className="font-medium text-ink underline underline-offset-2">
          {email}
        </a>
        .
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
    </LegalPage>
  );
}
