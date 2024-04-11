import "./Footer.css";

const Footer = () => {
  return (
    <section id="footer">
      <p>Make sure you follow us on social media :</p>
      <div className="social">
        <a href="">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-tiktok"></i>
        </a>
      </div>
      <p>If you have any questions please contact us through the email :</p>
      <a href="">contact@stylesynergy.com</a>
    </section>
  );
};

export default Footer;
