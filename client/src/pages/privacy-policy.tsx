import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Kartik Sharma Portfolio";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Privacy Policy of Kartik Sharma portfolio website. Learn how user data is collected, used and protected."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Privacy Policy of Kartik Sharma portfolio website. Learn how user data is collected, used and protected.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>

        <p className="text-muted-foreground mb-10">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                This Privacy Policy describes how Kartik Sharma (“we”, “our”, “us”)
                collects, uses, and protects information when users visit this
                portfolio website or interact through contact forms or services.
              </p>
              <p>
                By using this website, you agree to the practices described in
                this policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p className="font-semibold">Personal Information</p>
              <ul className="list-disc pl-6">
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone Number (if provided)</li>
                <li>Message / Inquiry Content</li>
              </ul>

              <p className="font-semibold mt-4">Automatically Collected Data</p>
              <ul className="list-disc pl-6">
                <li>IP Address</li>
                <li>Browser & Device Information</li>
                <li>Pages Visited</li>
                <li>Session Duration</li>
                <li>Referral Source</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Information</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to user inquiries and collaboration requests</li>
                <li>Provide services, project discussions or opportunities</li>
                <li>Improve website performance and user experience</li>
                <li>Analyze traffic and engagement trends</li>
                <li>Prevent spam, fraud, or security threats</li>
                <li>Send updates only when user consent is given</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                This website may use cookies or analytics tools to understand
                visitor behavior and improve functionality.
              </p>
              <p>
                Users can disable cookies through browser settings. Some features
                may not function properly after disabling cookies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                We may use trusted third-party tools such as hosting providers,
                analytics services, form handlers, or payment services (future use).
              </p>
              <p>
                These services may process limited data strictly for functionality.
                We do not sell or rent personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                We implement reasonable security practices to protect user data.
                However, no digital transmission or storage system is completely secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Personal information is retained only as long as necessary for
                communication, service delivery, or legal obligations.
                Users may request deletion at any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to stored personal data</li>
                <li>Request correction or update</li>
                <li>Request deletion</li>
                <li>Withdraw communication consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                This website may contain links to platforms such as GitHub,
                LinkedIn, or CodeUpPath. We are not responsible for privacy
                practices of external websites.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children’s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                This website is not intended for children under 13 years of age.
                We do not knowingly collect data from minors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We may update this policy periodically. Continued use of the
                website indicates acceptance of updated terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                For privacy related concerns, contact:
              </p>
              <p className="mt-2">
                Kartik Sharma <br />
                Email: your-email@example.com <br />
                Website Contact Form
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
