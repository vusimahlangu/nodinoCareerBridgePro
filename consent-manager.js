// consent-manager.js - Legal Consent System for CareerBridge Pro
class ConsentManager {
    constructor() {
        this.consent = {
            necessary: true, // Required for site function
            analytics: false,
            personalization: false,
            advertising: false,
            dataMonetization: false // This is our key monetization consent
        };
        this.loadConsent();
        this.showBannerIfNeeded();
    }

    loadConsent() {
        const saved = localStorage.getItem('cbp_consent');
        if (saved) this.consent = JSON.parse(saved);
    }

    saveConsent() {
        localStorage.setItem('cbp_consent', JSON.stringify(this.consent));
        this.hideBanner();
        this.executeConsentedServices();
    }

    showBannerIfNeeded() {
        if (!localStorage.getItem('cbp_consent')) {
            // Create and show the legal consent banner
            const bannerHTML = `
                <div id="consent-banner" style="position:fixed; bottom:0; left:0; right:0; background:#1e293b; color:white; padding:20px; z-index:10000; box-shadow:0 -2px 10px rgba(0,0,0,0.2);">
                    <div style="max-width:1200px; margin:0 auto;">
                        <h4 style="margin-bottom:10px;">Welcome to CareerBridge Pro</h4>
                        <p>To provide our free job-matching service, we use cookies and process <strong>anonymized data</strong>. This helps us:
                        <ul style="margin:10px 0; padding-left:20px;">
                            <li>Match you with better jobs</li>
                            <li>Improve our AI assistant</li>
                            <li><strong>Generate revenue to keep the platform free</strong> by selling market trend reports (never your personal data)</li>
                        </ul>
                        <p>By accepting, you agree to our <a href="#privacy" style="color:#60a5fa;">Privacy Policy</a> and <a href="#terms" style="color:#60a5fa;">Terms of Service</a>.</p>
                        <div style="display:flex; gap:10px; margin-top:15px;">
                            <button onclick="consentManager.rejectAll()" style="padding:10px 20px; background:transparent; color:#94a3b8; border:1px solid #94a3b8; border-radius:5px; cursor:pointer;">Reject All</button>
                            <button onclick="consentManager.openSettings()" style="padding:10px 20px; background:#334155; color:white; border:none; border-radius:5px; cursor:pointer;">Manage Preferences</button>
                            <button onclick="consentManager.acceptAll()" style="padding:10px 20px; background:#3b82f6; color:white; border:none; border-radius:5px; cursor:pointer;">Accept All</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', bannerHTML);
        }
    }

    acceptAll() {
        this.consent = {
            necessary: true,
            analytics: true,
            personalization: true,
            advertising: true,
            dataMonetization: true // User explicitly agrees to anonymized data processing for monetization
        };
        this.saveConsent();
        alert("Thank you! Your consent supports free job matching for thousands.");
    }

    rejectAll() {
        this.consent = { necessary: true, analytics: false, personalization: false, advertising: false, dataMonetization: false };
        this.saveConsent();
        alert("Only necessary cookies enabled. Some free features may be limited.");
    }

    executeConsentedServices() {
        if (this.consent.dataMonetization) {
            // THIS IS THE LEGAL MONETIZATION ENGINE
            console.log("LEGAL MONETIZATION ACTIVE: Collecting anonymized data for market reports.");
            this.startDataCollection();
        }
        if (this.consent.analytics) {
            console.log("Analytics enabled.");
        }
    }

    startDataCollection() {
        // Collect only ANONYMIZED data
        const anonymousDataPoint = {
            timestamp: new Date().toISOString(),
            // NO personal identifiers
            jobCategory: 'IT', // Example from search
            searchLocation: 'Johannesburg',
            salaryRange: 'R80k-R120k',
            // A unique but random hash, not linked to user identity
            sessionHash: 'a1b2c3d4'
        };
        // In a real system, this would be sent to your backend
        console.log('Collected anonymous data point for monetization:', anonymousDataPoint);
        this.calculateRevenueValue(anonymousDataPoint);
    }

    calculateRevenueValue(data) {
        // Simulate value of this data point for market reports
        const dataValue = 0.05; // R0.05 per anonymized data point
        console.log(`Data value added to revenue pool: R${dataValue.toFixed(2)}`);
        // Here you would send this to your backend accounting system
    }
}

// Initialize the consent manager
const consentManager = new ConsentManager();
