import type { CSSProperties, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const aboutLinks = [
  { label: "Company", href: "#" },
  { label: "Our MD's Message", href: "#" },
  { label: "Our Team", href: "#" },
  { label: "Our Culture", href: "#" },
  { label: "Partner With Us", href: "#" },
  { label: "Become A Trainer", href: "#" },
];

const programLinks = [
  { label: "Abacus", href: "#" },
  { label: "Vedic Math", href: "#" },
  { label: "Mind Draft", href: "#" },
  { label: "Hand Writing", href: "#" },
  { label: "Short Courses", href: "#" },
  { label: "Online Learning Portal", href: "#" },
  { label: "FAQs", href: "#" },
];

const moreInfoLinks = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Refund & Cancellation", href: "#" },
];

const headingStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: "rgb(51, 51, 51)",
  marginBottom: "20px",
  marginTop: 0,
};

const linkStyle: CSSProperties = {
  fontSize: "14px",
  color: "rgb(105, 105, 105)",
  textDecoration: "none",
  lineHeight: 2,
  display: "block",
  transition: "color 0.2s",
};

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        style={linkStyle}
        className="hover:text-[rgb(255,102,0)]"
      >
        {label}
      </Link>
    </li>
  );
}

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {links.map((link) => (
        <FooterLink key={link.label} href={link.href} label={link.label} />
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "rgb(248, 248, 248)",
        width: "100%",
        paddingTop: "60px",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {/* Columns */}
        <div
          className="flex flex-wrap gap-y-10"
          style={{
            marginBottom: "40px",
            gap: "60px",
          }}
        >
          {/* Col 1: Address */}
          <div style={{ minWidth: "240px", flexShrink: 0 }}>
            <h5 style={headingStyle}>Address</h5>
            <Image
              src="/images/logo-footer.png"
              alt="Xtragenius"
              width={158}
              height={54}
              style={{ marginBottom: "16px" }}
            />
            <address
              style={{
                fontStyle: "normal",
                fontSize: "14px",
                color: "rgb(105, 105, 105)",
                lineHeight: 1.8,
              }}
            >
              Xtragenius Learning Systems,
              <br />
              No:9/60,Sowrasthra Nagar 10th cross st, Choolaimedu,
              <br />
              Chennai - 600 094.
              <br />
              Contact No : +91-9940633579 / 9840004161
            </address>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <Link
                href="#"
                style={{ color: "rgb(105, 105, 105)", transition: "color 0.2s" }}
                className="hover:text-[rgb(255,102,0)]"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </Link>
              <Link
                href="#"
                style={{ color: "rgb(105, 105, 105)", transition: "color 0.2s" }}
                className="hover:text-[rgb(255,102,0)]"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </Link>
              <Link
                href="#"
                style={{ color: "rgb(105, 105, 105)", transition: "color 0.2s" }}
                className="hover:text-[rgb(255,102,0)]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </Link>
              <Link
                href="#"
                style={{ color: "rgb(105, 105, 105)", transition: "color 0.2s" }}
                className="hover:text-[rgb(255,102,0)]"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </Link>
            </div>
          </div>

          {/* Col 2: About Us */}
          <div>
            <h5 style={headingStyle}>About Us</h5>
            <FooterLinkList links={aboutLinks} />
          </div>

          {/* Col 3: Programs */}
          <div>
            <h5 style={headingStyle}>Programs</h5>
            <FooterLinkList links={programLinks} />
          </div>

          {/* Col 4: More Info */}
          <div>
            <h5 style={headingStyle}>More Info</h5>
            <FooterLinkList links={moreInfoLinks} />
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: "1px solid rgb(229, 229, 229)",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "rgb(171, 171, 171)",
              margin: 0,
            }}
          >
            © 2022 Xtragenius. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
