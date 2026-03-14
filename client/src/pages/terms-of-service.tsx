import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms & Conditions | Kartik Sharma Portfolio";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Terms and Conditions for using Kartik Sharma portfolio website, services and digital products."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Terms and Conditions for using Kartik Sharma portfolio website, services and digital products.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Terms & Conditions
        </h1>

        <p className="text-muted-foreground mb-10">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                By accessing this portfolio website or using any services,
                digital products, or communication channels provided by Kartik Sharma,
                you agree to comply with these Terms & Conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>This website may offer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Portfolio and resume related services</li>
                <li>Project consultation or collaboration</li>
                <li>Digital resources or learning content</li>
                <li>Startup initiatives including CodeUpPath</li>
              </ul>
              <p className="mt-3">
                Services may be updated, modified or discontinued without prior notice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information in forms or communications</li>
                <li>Do not misuse website content or services</li>
                <li>Do not attempt to hack, reverse engineer or disrupt services</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payments & Digital Products (Future)</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Certain services or digital products may require payment.
                Pricing, delivery timelines and refund eligibility will be clearly
                communicated before purchase.
              </p>
              <p className="mt-2">
                Unauthorized payment disputes or misuse may result in service suspension.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                All content including designs, code samples, branding elements,
                text, graphics and digital resources are owned by Kartik Sharma
                unless otherwise stated.
              </p>
              <p className="mt-2">
                Unauthorized copying, redistribution or commercial use is prohibited.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                This website may contain links to third-party platforms such as
                GitHub, LinkedIn or CodeUpPath. We are not responsible for their
                content, policies or practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We strive to keep services available but do not guarantee uninterrupted
                or error-free operation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Kartik Sharma shall not be liable for any direct or indirect loss,
                data damage, opportunity loss or business interruption arising from
                the use or inability to use this website or services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination of Access</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We reserve the right to restrict or terminate access to users who
                violate these terms or misuse services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Terms may be updated anytime. Continued use of the website indicates
                acceptance of updated terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                These Terms are governed by the laws of India.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                For any questions regarding these Terms:
              </p>
              <p className="mt-2">
                Kartik Sharma <br />
                Email: kartikuma92612gmail.com
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
