import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import "./terms.css";
import Logo from "../assets/images/logo-simbli.png";
const TermsAndConditions = () => {
  return (
    <div className="container-fluid px-4 px-lg-0 terms overflow-hidden">
      {/* Top logo */}
      <div className="container top-nv pt-4 px-lg-0">
        <a href="https://beta.simbli.ai/">
          <img src={Logo} className="logo" alt="Simbli Logo" />
        </a>
      </div>

      <div className="container mt-5 px-lg-5 pt-5 p-0">
        <h1 className="privacy-policy-sim">TERMS AND CONDITIONS</h1>
        <p className="privacy-policy-p pt-3">
          Last updated: September 01, 2025
        </p>

        {/* AGREEMENT */}
        <h6 className="privacy-policy-h5 pt-3">Agreement to Terms</h6>
        <p className="privacy-policy-p pt-3">
          By accessing or using this website, application, and any related
          products or services (collectively, the “Services”), you agree to be
          bound by these Terms and Conditions (“Terms”). If you do not agree, do
          not use the Services.
        </p>
        <p className="privacy-policy-p pt-3">
          These Terms apply to all visitors, users, and others who access the
          Services. Supplemental terms may apply to specific features; if there
          is a conflict, those supplemental terms control for that feature.
        </p>

        {/* -------------------- ALL 26 SECTIONS -------------------- */}

        <h6 className="privacy-policy-h6 pt-4">
          Changes to the Services or Terms
        </h6>
        <p className="privacy-policy-p">
          We may modify the Services or these Terms at any time. Material
          changes will be indicated by updating the “Last updated” date and/or
          providing reasonable notice via the Services. Your continued use after
          changes become effective constitutes acceptance of the revised Terms.
        </p>

        <h6 className="privacy-policy-h6 pt-3">Eligibility</h6>

        <p className="privacy-policy-p">
          The Services are intended for individuals who are at least the age of
          majority in their place of residence (or have parental consent where
          permitted by law). Do not use the Services if this is not the case.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Acceptable Use</h6>
        <p className="privacy-policy-p">You agree not to:</p>
        <ul className="privacy-policy-p">
          <li className="pt-2">Violate any applicable law or regulation.</li>
          <li className="pt-2">
            Infringe the intellectual property, privacy, or other rights of
            others.
          </li>
          <li className="pt-2">
            Upload malicious code or interfere with the operation or security of
            the Services.
          </li>
          <li className="pt-2">
            Access or collect data from the Services using automated means
            without permission.
          </li>
          <li className="pt-2">
            Impersonate any person or entity or misrepresent your affiliation.
          </li>
          <li className="pt-2">
            Use the Services to build a competing product or service.
          </li>
          <li className="pt-2">
            We may monitor, suspend, or terminate access where we reasonably
            believe these Terms are violated.
          </li>
        </ul>

        <h6 className="privacy-policy-h6 pt-4">Intellectual Property</h6>
        <p className="privacy-policy-p">
          All content, software, features, functionality, trademarks, logos, and
          other materials provided by or on behalf of the Services (“Service
          Materials”) are owned by us or our licensors and are protected by law.
          Subject to these Terms, we grant you a limited, revocable,
          non-exclusive, non-transferable license to access and use the Services
          for personal or internal business purposes. No other rights are
          granted. Do not copy, modify, distribute, sell, or create derivative
          works from the Service Materials except as expressly permitted.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Your Content</h6>
        <p className="privacy-policy-p">
          You may submit content (e.g., text, images, reviews, data) (“User
          Content”). You retain your rights in your User Content. By submitting
          User Content, you grant us a worldwide, non-exclusive, royalty-free
          license to host, store, reproduce, display, and process it solely as
          necessary to operate, improve, and provide the Services and to comply
          with law. You represent that you have all rights necessary to grant
          this license and that your User Content does not violate the law or
          third-party rights. We may remove User Content that we reasonably
          believe violates these Terms.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Feedback</h6>
        <p className="privacy-policy-p">
          If you provide suggestions, ideas, or feedback, you grant us a
          perpetual, irrevocable, worldwide, royalty-free license to use and
          exploit the feedback without restriction or obligation to you.
        </p>

        <h6 className="privacy-policy-h6 pt-4">
          Purchases, Subscriptions, and Trials
        </h6>
        <p className="privacy-policy-p">
          If the Services include paid features:
        </p>
        <ul className="privacy-policy-p">
          <li className="pt-2">
            Billing. Prices may change from time to time. Taxes may apply.
          </li>
          <li className="pt-2">
            Renewal. Subscriptions renew automatically at the then-current rate
            unless canceled before the renewal date.
          </li>
          <li className="pt-2">
            Trials. If a free trial is offered, access may convert to a paid
            subscription at the end of the trial unless canceled beforehand.
          </li>
          <li className="pt-2">
            Cancellations & Refunds. You can cancel at any time effective at the
            end of your current billing period. Fees paid are non-refundable
            except where required by law.
          </li>
        </ul>

        <h6 className="privacy-policy-h6 pt-4">
          Third-Party Services and Links
        </h6>
        <p className="privacy-policy-p">
          The Services may link to or integrate with third-party websites,
          products, or services. We do not control and are not responsible for
          third-party content or practices. Your use of third-party services is
          subject to their terms and policies.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Reviews and Community Areas</h6>
        <p className="privacy-policy-p">
          Where reviews or community features are available, you agree to post
          only authentic, lawful, and respectful content based on your genuine
          experience. We may moderate, remove, or refuse content at our
          discretion.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Privacy</h6>
        <p className="privacy-policy-p">
          Your use of the Services is subject to our Privacy Notice made
          available via the Services. By using the Services, you consent to the
          collection, use, and sharing of information as described there.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Service Availability</h6>
        <p className="privacy-policy-p">
          We strive to keep the Services available, but they may be interrupted,
          suspended, or modified at any time, including for maintenance,
          upgrades, or events beyond our control. We are not liable for any
          unavailability or data loss, except as required by law.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Disclaimer of Warranties</h6>
        <p className="privacy-policy-p">
          To the maximum extent permitted by law, the services and all service
          materials are provided “as is” and “as available” without warranties
          of any kind, whether express, implied, or statutory, including implied
          warranties of merchantability, fitness for a particular purpose,
          title, and non-infringement. We do not warrant that the services will
          be error-free, secure, or uninterrupted, or that defects will be
          corrected.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Limitation of Liability</h6>
        <p className="privacy-policy-p">
          To the maximum extent permitted by law, in no event will we be liable
          for indirect, incidental, special, consequential, exemplary, or
          punitive damages, or any loss of profits, revenue, goodwill, or data,
          arising out of or related to your use of the services, even if advised
          of the possibility of such damages. To the maximum extent permitted by
          law, our total liability for all claims relating to the services will
          not exceed the greater of (a) the amount you paid for the paid portion
          of the services in the 12 months before the event giving rise to the
          liability, or (b) USD 100 (or equivalent).
        </p>
        <p className="privacy-policy-p">
          Some jurisdictions do not allow certain disclaimers or limitations; in
          such cases, the above will apply to the fullest extent permitted by
          applicable law.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Indemnification</h6>
        <p className="privacy-policy-p">
          You agree to defend, indemnify, and hold harmless us and our
          affiliates, and our respective officers, directors, employees, and
          agents from and against any claims, damages, liabilities, costs, and
          expenses (including reasonable legal fees) arising out of or related
          to: (a) your User Content; (b) your use or misuse of the Services; or
          (c) your violation of these Terms or applicable law.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Suspension and Termination</h6>
        <p className="privacy-policy-p">
          We may suspend or terminate your access to the Services at any time,
          with or without notice, if we reasonably believe you have violated
          these Terms or if we discontinue the Services. Upon termination, the
          rights granted to you will cease immediately. Sections intended by
          their nature to survive (including ownership, disclaimers, limitations
          of liability, indemnities, and dispute provisions) will survive
          termination.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Dispute Resolution</h6>
        <p className="privacy-policy-p">
          Before filing a formal claim, the parties agree to attempt to resolve
          any dispute informally in good faith within 30 days after written
          notice of the dispute.
        </p>
        <p className="privacy-policy-p">
          Where permitted by law, disputes will be resolved in the courts of
          your place of residence or, if you use the Services on behalf of a
          business, in a competent court where we are primarily established.
          Nothing prevents either party from seeking urgent injunctive or
          equitable relief in any competent court. If applicable law requires
          arbitration or permits it by agreement, the arbitration will be
          administered by a reputable provider under its rules, with a single
          arbitrator, in English, and with each party bearing its own costs
          unless the tribunal decides otherwise. Consumer-mandatory laws and
          rights are not waived.
        </p>
        <p className="privacy-policy-p">
          Class actions and class arbitrations are not permitted to the extent
          allowed by law.
        </p>

        <h6 className="privacy-policy-h6 pt-4">International Use</h6>
        <p className="privacy-policy-p">
          You are responsible for compliance with local laws. We do not
          represent that the Services are appropriate or available in every
          location.
        </p>

        <h6 className="privacy-policy-h6 pt-4"> Electronic Communications</h6>
        <p className="privacy-policy-p">
          You consent to receive notices and communications electronically and
          agree that such communications satisfy any legal requirement that they
          be in writing.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Miscellaneous</h6>
        <p className="privacy-policy-p">
          Entire Agreement. These Terms, together with any supplemental terms
          and the Privacy Notice, constitute the entire agreement between you
          and us regarding the Services.
        </p>
        <p className="privacy-policy-p">
          Severability. If any provision is found unenforceable, the remaining
          provisions remain in full force and effect.
        </p>
        <p className="privacy-policy-p">
          No Waiver. Failure to enforce a provision is not a waiver.
        </p>
        <p className="privacy-policy-p">
          Assignment. You may not assign these Terms without our prior consent.
          We may assign these Terms without restriction.
        </p>
        <p className="privacy-policy-p">
          Force Majeure. We are not liable for any delay or failure due to
          events beyond our reasonable control.
        </p>

        <h6 className="privacy-policy-h6 pt-4">Contact</h6>
        <p className="privacy-policy-p">
          If you have any questions about these Legal Terms, please contact us
          at:
        </p>
        <p className="privacy-policy-p">By email: contact@simbli.ai</p>
        {/* <p className="privacy-policy-p">
          Address: Plot No 3, Vaigai Colony I Floor, Anna Nagar, Madurai, Tamil
          Nadu 625020, India.
        </p> */}
      </div>
    </div>
  );
};

export default TermsAndConditions;
