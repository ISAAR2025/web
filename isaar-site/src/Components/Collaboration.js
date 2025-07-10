import React from 'react';
import './Collaboration.css';
import ci from '../IMP2.jpeg';

const Collaboration = () => {
  return (
    <div className="collab-page">
      <img src={ci} alt="Collaboration Banner" className="collab-banner" />
      <div className="collab-header">
        <h1> Collaborate With ISAR</h1>
        <p>Bring UAV Training to Your Institution</p>
      </div>

      <section className="collab-section">
        <h2>Why Collaborate with ISAR?</h2>
        <ul>
          <li>DGCA-aligned UAV curriculum and certified instructors</li>
          <li> Hands-on drone flying labs, workshops, and competitions</li>
          <li> STEM & aerospace exposure for students of all ages</li>
          <li> Customized programs for schools, colleges & universities</li>
          <li> Internships and career pathways in drone technology</li>
        </ul>
      </section>

      <section className="collab-invite">
        <h2>Who Can Collaborate?</h2>
        <p>
          We welcome collaboration from:
        </p>
        <ul>
          <li>🏫 Schools</li>
          <li>🎓 Colleges & Universities</li>
          <li>🏢 Technical and Vocational Institutes</li>
        </ul>
      </section>

      <section className="collab-contact">
        <h2>📩 Let’s Work Together</h2>
        <p>
          Interested in partnering with us? Reach out and let's build the future of drone education together.
        </p>
        <p><strong>📧 Email:</strong> admin@isaar.in</p>
        <p><strong>📞 Phone:</strong> +91-6374720788</p>
        <p><strong>🌐 Website:</strong> www.isaar.in</p>

        <a href="/contact">
          <button className="collab-button">Contact Us</button>
        </a>
      </section>
    </div>
  );
};

export default Collaboration;
