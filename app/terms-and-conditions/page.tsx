import { LegalPage } from "@/components/sections/legal-page";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms that apply to your use of the Ticmark Properties website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  const { email } = siteConfig.contact;
  return (
    <LegalPage title="Terms & Conditions" path="/terms-and-conditions" updated="To be confirmed">
      <p>These Terms &amp; Conditions govern your use of the Ticmark Properties website. By using the website, you agree to these terms.</p>

      <h2>Information on this website</h2>
      <p>
        Project and property information, including prices, sizes, availability, payment plans and completion dates, is provided for general
        information only and may change without notice. It does not constitute an offer or a contract. Please confirm all details with our
        team and the relevant developer before making any decision.
      </p>

      <h2>No professional advice</h2>
      <p>
        Content on this website is not legal, financial or investment advice. You should seek independent professional advice before buying
        or investing in property.
      </p>

      <h2>Images and media</h2>
      <p>Photographs, renders and videos may be illustrative and may not represent the final product.</p>

      <h2>Third-party links and content</h2>
      <p>
        This website may link to or embed third-party content. We are not responsible for the content or practices of third-party websites.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Ticmark Properties name, logo and website content are owned by Ticmark Properties or used with permission and may not be reused
        without consent.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, Ticmark Properties is not liable for any loss arising from reliance on information on this website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Pakistan.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${email}`} className="font-medium text-ink underline underline-offset-2">
          {email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
