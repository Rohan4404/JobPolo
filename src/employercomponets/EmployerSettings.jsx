import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  IoMdSettings,
  IoMdBusiness,
  IoMdNotifications,
  //   IoMdShield,
  IoMdGlobe,
} from "react-icons/io";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaUsers,
  FaBriefcase,
  FaToggleOn,
  FaToggleOff,
  FaCamera,
  FaSave,
  FaIndustry,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoShield } from "react-icons/io5";
import { BiPalette } from "react-icons/bi";
import { MdEmail, MdVerified, MdDangerous } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import EmployerHeader from "./EmployerHeader";
import EmployerFooter from "./EmployerFooter";
// ─── Sidebar Tabs ──────────────────────────────────────────────────────────────
const TABS = [
  { id: "company", label: "Company Profile", icon: FaBuilding },
  { id: "account", label: "Account Settings", icon: IoMdSettings },
  { id: "notifications", label: "Notifications", icon: IoMdNotifications },
  { id: "privacy", label: "Privacy & Security", icon: IoShield },
  { id: "appearance", label: "Appearance", icon: BiPalette },
  { id: "billing", label: "Billing & Plan", icon: FaBriefcase },
];

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 text-start">
      {(title || description) && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          {title && (
            <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function Field({ label, icon: Icon, ...inputProps }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="text-gray-400" size={15} />
          </div>
        )}
        <input
          {...inputProps}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white`}
        />
      </div>
    </div>
  );
}

// ─── Select Field ─────────────────────────────────────────────────────────────
function SelectField({ label, icon: Icon, children, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="text-gray-400" size={15} />
          </div>
        )}
        <select
          {...props}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white appearance-none`}
        >
          {children}
        </select>
      </div>
    </div>
  );
}

// ─── Save Button ──────────────────────────────────────────────────────────────
function SaveBtn({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
    >
      <FaSave size={14} />
      {loading ? "Saving…" : "Save Changes"}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  Tab Panels
// ══════════════════════════════════════════════════════════════════════════════

// ── 1. Company Profile ────────────────────────────────────────────────────────
function CompanyProfile() {
  const [saving, setSaving] = useState(false);
  const [logo, setLogo] = useState(null);
  const [form, setForm] = useState({
    companyName: "JobPolo Technologies Pvt. Ltd.",
    tagline: "Connecting talent with opportunity",
    industry: "Information Technology",
    companySize: "51-200",
    founded: "2020",
    website: "https://jobpolo.com",
    linkedin: "",
    twitter: "",
    phone: "+91 9876543210",
    email: "hr@jobpolo.com",
    country: "India",
    state: "Uttar Pradesh",
    city: "Meerut",
    pincode: "250001",
    address: "123, Tech Park, NH-58",
    description:
      "We are a leading job portal connecting employers with top talent across India.",
  });

  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Company profile updated!");
    }, 1200);
  };

  return (
    <div>
      {/* Logo Upload */}
      <SectionCard
        title="Company Logo & Branding"
        description="Upload your company logo and cover photo"
      >
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-dashed border-blue-300 flex items-center justify-center overflow-hidden">
              {logo ? (
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <FaBuilding size={32} className="text-blue-400" />
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
              <FaCamera size={12} className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (f) setLogo(URL.createObjectURL(f));
                }}
              />
            </label>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Company Logo</p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 2MB. Recommended 200×200px
            </p>
            <label className="mt-2 inline-block px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (f) setLogo(URL.createObjectURL(f));
                }}
              />
            </label>
          </div>
        </div>
      </SectionCard>

      {/* Basic Info */}
      <SectionCard
        title="Basic Information"
        description="Core details about your company"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Company Name"
            icon={FaBuilding}
            value={form.companyName}
            onChange={change("companyName")}
            placeholder="Your company name"
          />
          <Field
            label="Tagline"
            value={form.tagline}
            onChange={change("tagline")}
            placeholder="Short description"
          />
          <SelectField
            label="Industry"
            icon={FaIndustry}
            value={form.industry}
            onChange={change("industry")}
          >
            {[
              "Information Technology",
              "Healthcare",
              "Finance",
              "Education",
              "E-Commerce",
              "Manufacturing",
              "Media & Entertainment",
              "Other",
            ].map((i) => (
              <option key={i}>{i}</option>
            ))}
          </SelectField>
          <SelectField
            label="Company Size"
            icon={FaUsers}
            value={form.companySize}
            onChange={change("companySize")}
          >
            {["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </SelectField>
          <Field
            label="Founded Year"
            value={form.founded}
            onChange={change("founded")}
            placeholder="e.g. 2015"
            type="number"
          />
          <Field
            label="Website"
            icon={FaGlobe}
            value={form.website}
            onChange={change("website")}
            placeholder="https://yoursite.com"
            type="url"
          />
        </div>
      </SectionCard>

      {/* Social Links */}
      <SectionCard
        title="Social Media"
        description="Link your company's social profiles"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="LinkedIn"
            icon={FaLinkedin}
            value={form.linkedin}
            onChange={change("linkedin")}
            placeholder="https://linkedin.com/company/..."
          />
          <Field
            label="Twitter / X"
            icon={FaTwitter}
            value={form.twitter}
            onChange={change("twitter")}
            placeholder="https://twitter.com/..."
          />
        </div>
      </SectionCard>

      {/* Contact */}
      <SectionCard
        title="Contact Details"
        description="How candidates can reach your company"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Phone"
            icon={FaPhone}
            value={form.phone}
            onChange={change("phone")}
            placeholder="+91 XXXXX XXXXX"
            type="tel"
          />
          <Field
            label="Company Email"
            icon={FaEnvelope}
            value={form.email}
            onChange={change("email")}
            placeholder="hr@company.com"
            type="email"
          />
        </div>
      </SectionCard>

      {/* Location */}
      <SectionCard title="Location" description="Company headquarters address">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <SelectField
            label="Country"
            icon={IoMdGlobe}
            value={form.country}
            onChange={change("country")}
          >
            {["India", "USA", "UK", "Canada", "Australia", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
          <Field
            label="State"
            icon={FaMapMarkerAlt}
            value={form.state}
            onChange={change("state")}
            placeholder="State"
          />
          <Field
            label="City"
            value={form.city}
            onChange={change("city")}
            placeholder="City"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Address Line"
            value={form.address}
            onChange={change("address")}
            placeholder="Street address"
          />
          <Field
            label="PIN / ZIP Code"
            value={form.pincode}
            onChange={change("pincode")}
            placeholder="000000"
          />
        </div>
      </SectionCard>

      {/* Description */}
      <SectionCard
        title="Company Description"
        description="Tell candidates about your company culture and mission"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            About Company
          </label>
          <textarea
            rows={5}
            value={form.description}
            onChange={change("description")}
            placeholder="Describe your company, culture, values..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">
            {form.description.length}/1000 characters
          </p>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveBtn loading={saving} onClick={handleSave} />
      </div>
    </div>
  );
}

// ── 2. Account Settings ────────────────────────────────────────────────────────
function AccountSettings() {
  const [saving, setSaving] = useState(false);
  const { firstName, lastName, role } = useSelector?.((s) => s.user) || {};
  const [form, setForm] = useState({
    firstName: firstName || "John",
    lastName: lastName || "Doe",
    email: sessionStorage.getItem?.("email") || "john@jobpolo.com",
    phone: "+91 9876543210",
    designation: "HR Manager",
    language: "English",
    timezone: "Asia/Kolkata",
  });
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <SectionCard
        title="Personal Information"
        description="Your personal account details"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="First Name"
            value={form.firstName}
            onChange={change("firstName")}
            placeholder="First name"
          />
          <Field
            label="Last Name"
            value={form.lastName}
            onChange={change("lastName")}
            placeholder="Last name"
          />
          <Field
            label="Email Address"
            icon={FaEnvelope}
            value={form.email}
            onChange={change("email")}
            placeholder="you@company.com"
            type="email"
          />
          <Field
            label="Phone Number"
            icon={FaPhone}
            value={form.phone}
            onChange={change("phone")}
            placeholder="+91 XXXXX XXXXX"
            type="tel"
          />
          <Field
            label="Designation / Role"
            value={form.designation}
            onChange={change("designation")}
            placeholder="e.g. HR Manager"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Preferences"
        description="Language and regional settings"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Language"
            value={form.language}
            onChange={change("language")}
          >
            {["English", "Hindi", "Spanish", "French", "German"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </SelectField>
          <SelectField
            label="Timezone"
            value={form.timezone}
            onChange={change("timezone")}
          >
            {[
              "Asia/Kolkata",
              "UTC",
              "America/New_York",
              "Europe/London",
              "Asia/Dubai",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </SelectField>
        </div>
      </SectionCard>

      <SectionCard
        title="Danger Zone"
        description="Irreversible account actions"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-red-600 flex items-center gap-2">
              <MdDangerous size={18} /> Delete Account
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
            Delete Account
          </button>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveBtn
          loading={saving}
          onClick={() => {
            setSaving(true);
            setTimeout(() => {
              setSaving(false);
              toast.success("Account updated!");
            }, 1000);
          }}
        />
      </div>
    </div>
  );
}

// ── 3. Notifications ──────────────────────────────────────────────────────────
function Notifications() {
  const [settings, setSettings] = useState({
    newApplication: true,
    applicationStatus: true,
    jobExpiry: true,
    weeklyReport: false,
    newMessage: true,
    profileViews: false,
    emailDigest: true,
    smsAlerts: false,
    browserPush: true,
    marketingEmails: false,
  });

  const toggle = (k) => setSettings((p) => ({ ...p, [k]: !p[k] }));

  const rows = [
    {
      key: "newApplication",
      label: "New Job Application",
      desc: "When a candidate applies to your job posting",
    },
    {
      key: "applicationStatus",
      label: "Application Status Update",
      desc: "When candidate withdraws or updates application",
    },
    {
      key: "jobExpiry",
      label: "Job Expiry Reminder",
      desc: "3 days before a job posting expires",
    },
    {
      key: "weeklyReport",
      label: "Weekly Analytics Report",
      desc: "Summary of job performance every Monday",
    },
    {
      key: "newMessage",
      label: "New Message",
      desc: "When a candidate messages you",
    },
    {
      key: "profileViews",
      label: "Company Profile Views",
      desc: "Daily summary of who viewed your profile",
    },
  ];

  const channels = [
    {
      key: "emailDigest",
      label: "Email Digest",
      desc: "Receive a daily email summary",
    },
    {
      key: "smsAlerts",
      label: "SMS Alerts",
      desc: "Get critical alerts via SMS",
    },
    {
      key: "browserPush",
      label: "Browser Push",
      desc: "Desktop/browser push notifications",
    },
    {
      key: "marketingEmails",
      label: "Marketing Emails",
      desc: "Tips, updates and offers from JobPolo",
    },
  ];

  return (
    <div>
      <SectionCard
        title="Notification Events"
        description="Choose which events trigger notifications"
      >
        <div className="divide-y divide-gray-100">
          {rows.map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <Toggle enabled={settings[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Notification Channels"
        description="How you want to receive notifications"
      >
        <div className="divide-y divide-gray-100">
          {channels.map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <Toggle enabled={settings[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveBtn
          loading={false}
          onClick={() => toast.success("Notification preferences saved!")}
        />
      </div>
    </div>
  );
}

// ── 4. Privacy & Security ─────────────────────────────────────────────────────
function PrivacySecurity() {
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showContactInfo: false,
    allowIndexing: true,
    twoFactor: false,
    loginAlerts: true,
  });
  const toggle = (k) => setPrivacy((p) => ({ ...p, [k]: !p[k] }));

  const privacyRows = [
    {
      key: "publicProfile",
      label: "Public Company Profile",
      desc: "Make your company profile visible to all job seekers",
    },
    {
      key: "showContactInfo",
      label: "Show Contact Info",
      desc: "Display phone/email on your public profile",
    },
    {
      key: "allowIndexing",
      label: "Search Engine Indexing",
      desc: "Allow Google to index your company profile",
    },
  ];

  const securityRows = [
    {
      key: "twoFactor",
      label: "Two-Factor Authentication",
      desc: "Require OTP on every login for extra security",
    },
    {
      key: "loginAlerts",
      label: "Login Activity Alerts",
      desc: "Email me when a new login is detected",
    },
  ];

  return (
    <div>
      <SectionCard
        title="Profile Privacy"
        description="Control who can see your company information"
      >
        <div className="divide-y divide-gray-100">
          {privacyRows.map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <Toggle enabled={privacy[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Security" description="Protect your account">
        <div className="divide-y divide-gray-100 mb-4">
          {securityRows.map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <Toggle enabled={privacy[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>

        {/* Recent Sessions */}
        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">
            Active Sessions
          </p>
          {[
            {
              device: "Chrome on Windows",
              location: "Meerut, India",
              current: true,
              time: "Now",
            },
            {
              device: "Mobile App – Android",
              location: "Meerut, India",
              current: false,
              time: "2 hrs ago",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 border-b last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">{s.device}</p>
                <p className="text-xs text-gray-500">
                  {s.location} · {s.time}
                </p>
              </div>
              {s.current ? (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <MdVerified size={14} /> Current
                </span>
              ) : (
                <button className="text-xs text-red-500 hover:underline">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveBtn
          loading={false}
          onClick={() => toast.success("Privacy settings updated!")}
        />
      </div>
    </div>
  );
}

// ── 5. Appearance ─────────────────────────────────────────────────────────────
function Appearance() {
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("#0A65CC");
  const [density, setDensity] = useState("comfortable");

  const accents = [
    "#0A65CC",
    "#7C3AED",
    "#059669",
    "#DC2626",
    "#D97706",
    "#0891B2",
  ];

  return (
    <div>
      <SectionCard title="Theme" description="Choose your dashboard look">
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              id: "light",
              label: "Light",
              bg: "bg-white border-gray-200",
              circle: "bg-blue-500",
            },
            {
              id: "dark",
              label: "Dark",
              bg: "bg-gray-900 border-gray-700",
              circle: "bg-blue-400",
            },
            {
              id: "system",
              label: "System",
              bg: "bg-gradient-to-br from-white to-gray-800 border-gray-300",
              circle: "bg-blue-500",
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative p-4 rounded-xl border-2 text-start transition-all ${
                theme === t.id
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-full h-14 rounded-lg ${t.bg} border flex items-center justify-center mb-2`}
              >
                <div className={`w-6 h-6 rounded-full ${t.circle}`} />
              </div>
              <p className="text-xs font-medium text-gray-700">{t.label}</p>
              {theme === t.id && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </span>
              )}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Accent Color"
        description="Primary color used across the dashboard"
      >
        <div className="flex items-center gap-3 flex-wrap">
          {accents.map((c) => (
            <button
              key={c}
              onClick={() => setAccent(c)}
              style={{ backgroundColor: c }}
              className={`w-9 h-9 rounded-full transition-all ${accent === c ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"}`}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Density"
        description="Control how compact the layout feels"
      >
        <div className="grid grid-cols-3 gap-3">
          {["compact", "comfortable", "spacious"].map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={`py-3 rounded-xl border-2 capitalize text-sm font-medium transition-all ${
                density === d
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveBtn
          loading={false}
          onClick={() => toast.success("Appearance saved!")}
        />
      </div>
    </div>
  );
}

// ── 6. Billing & Plan ─────────────────────────────────────────────────────────
function Billing() {
  const plans = [
    {
      id: "free",
      label: "Free",
      price: "₹0",
      period: "/month",
      features: ["3 Active Job Posts", "Basic Analytics", "Email Support"],
      color: "gray",
    },
    {
      id: "pro",
      label: "Pro",
      price: "₹999",
      period: "/month",
      features: [
        "Unlimited Job Posts",
        "Advanced Analytics",
        "Priority Support",
        "Featured Listings",
      ],
      color: "blue",
      popular: true,
    },
    {
      id: "enterprise",
      label: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Everything in Pro",
        "Dedicated Account Manager",
        "Custom Branding",
        "API Access",
      ],
      color: "purple",
    },
  ];
  const [current, setCurrent] = useState("free");

  return (
    <div>
      <SectionCard title="Current Plan" description="Your active subscription">
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FaBriefcase className="text-blue-600" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">Free Plan</p>
            <p className="text-xs text-gray-500">
              3 active job posts · Renews never
            </p>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
            Active
          </span>
        </div>
      </SectionCard>

      <SectionCard
        title="Upgrade Plan"
        description="Choose a plan that fits your hiring needs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 p-5 transition-all cursor-pointer ${
                current === plan.id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setCurrent(plan.id)}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              <p className="font-semibold text-gray-800 text-sm">
                {plan.label}
              </p>
              <p className="mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-xs text-gray-500">{plan.period}</span>
              </p>
              <ul className="mt-4 space-y-1.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-gray-600 flex items-center gap-2"
                  >
                    <span className="text-blue-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              {current === plan.id && (
                <div className="mt-4 text-center text-xs font-medium text-blue-600">
                  Current Plan
                </div>
              )}
            </div>
          ))}
        </div>
        {current !== "free" && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => toast.info("Redirecting to payment…")}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Upgrade Now
            </button>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Invoices" description="Download past invoices">
        <div className="py-8 text-gray-400 text-start">
          <FaBriefcase size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">
            No invoices yet. Upgrade to a paid plan to see billing history.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  Main Settings Page
// ══════════════════════════════════════════════════════════════════════════════
export default function EmployerSettings() {
  const [activeTab, setActiveTab] = useState("company");
  const navigate = useNavigate();

  const panels = {
    company: <CompanyProfile />,
    account: <AccountSettings />,
    notifications: <Notifications />,
    privacy: <PrivacySecurity />,
    appearance: <Appearance />,
    billing: <Billing />,
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-left">
      <EmployerHeader />
      {/* HEADER (NO SCROLL) */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 px-4 sm:px-6 py-6 flex-shrink-0">
        <div className="w-full mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:shadow-md transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-blue-900">Settings</h1>
            <p className="text-blue-700 mt-1">
              Manage your employer account & preferences
            </p>
          </div>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 overflow-hidden px-4 sm:px-6 py-6">
        <div className="flex h-full gap-6">
          {/* SIDEBAR (NO SCROLL) */}
          <aside className="w-56 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-gray-200 shadow-sm h-full overflow-y-auto">
              {TABS.map((tab, idx) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm ${
                      idx !== 0 ? "border-t border-gray-100" : ""
                    } ${
                      active
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 font-medium"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={active ? "text-blue-600" : "text-gray-400"}
                    />
                    {tab.label}

                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* CONTENT (ONLY THIS SCROLLS) */}
          <main className="flex-1 h-full overflow-y-auto pr-2">
            {panels[activeTab]}
          </main>
        </div>
      </div>

      {/* FOOTER (NO SCROLL) */}
      <div className="flex-shrink-0">
        <EmployerFooter />
      </div>
    </div>
  );
}
