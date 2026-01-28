import React from 'react';
import './Policies.css';

const Terms: React.FC = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>📋 Terms & Conditions</h1>
        <p className="last-updated">Last Updated: January 28, 2024</p>

        <div className="policy-content">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using the ElectroShop website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on ElectroShop's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2>3. Disclaimer</h2>
            <p>
              The materials on ElectroShop's website are provided on an 'as is' basis. ElectroShop makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2>4. Limitations</h2>
            <p>
              In no event shall ElectroShop or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ElectroShop's website.
            </p>
          </section>

          <section>
            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on ElectroShop's website could include technical, typographical, or photographic errors. ElectroShop does not warrant that any of the materials on our website are accurate, complete, or current. ElectroShop may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2>6. Links</h2>
            <p>
              ElectroShop has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ElectroShop of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2>7. Modifications</h2>
            <p>
              ElectroShop may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
