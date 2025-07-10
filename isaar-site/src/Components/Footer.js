import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => navigate('/contact'); // ✅ fix here

  return (
    <footer className="footer">
      <div className="footer-text">
        <p>&copy; {new Date().getFullYear()} www.isaar.in</p>
        
          {/* Collaborate Section */}
          <div className="col">
            <h2>Collaborate With Us</h2>
            <p>
              We welcome <strong>schools, colleges, and universities</strong> to partner with ISAR and bring
              advanced UAV training to their students. Let's build the future of aerospace education together.
            </p>
            <p> <strong>Phone:</strong> +91-6374720788</p>
            <p> <strong>Email:</strong> admin@isaar.in</p>
          </div>
        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-left">
              <h1>Get in Touch</h1>
            </div>
            <div className="contact-right">
              <h3>Visit Us</h3>
              <p>Reach Out to Us Today</p>
              <a href="https://www.instagram.com/_isar_25?igsh=MTR6OWFrd2V6dWs5Zw==">Subscribe</a>
              <p>Connect</p>
            </div>
          </div>
          <div className="contact-button-wrap">
            <button className="contact-btn" onClick={handleContactClick}>
              Contact Us
            </button>
          </div>
        </section>
        <div className="footer-icons">
          <a href="https://www.instagram.com/_isar_25?igsh=MTR6OWFrd2V6dWs5Zw==" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} style={{ marginRight: '8px' }} />
          </a>
          <a href="https://www.linkedin.com/company/indian-scientific-aerospace-and-robotics/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} style={{ marginRight: '8px' }} />
          </a>
          <a href="https://www.facebook.com/share/16n143NgEy/" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={20} style={{ marginRight: '8px' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
