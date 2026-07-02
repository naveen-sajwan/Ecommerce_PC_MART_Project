import React from 'react'

const AboutsUs = () => {
  return (
    <>
        <div className="aboutUs_outerWrapper">
            <div className="aboutUs_firstSection">
                <div className="aboutUs_heroContainer">
                    <p>About-Us</p>
                </div>
            </div>
            <div className="aboutUs_secondSection">
                <h2 className="headline">Our Story</h2>
                <article>Built by Enthusiasts, For Enthusiasts</article>
                <p><strong>PC-Mart</strong> was born in 2025 from a simple frustration: finding genuine, high-quality PC parts without overpaying or getting scammed with counterfeit products. What started as a small group of friends helping others build their dream rigs has grown into a trusted destination for PC builders across the country. But one thing hasn't changed – our commitment to authenticity, transparency, and real customer support. We test what we sell. We answer your questions honestly. And we never recommend a part just to make a sale.</p>
            </div>
            <div className="aboutUs_secondSection">
                <h2 className="headline">Our Mission</h2>
                <article>Our Mission: Power Your Passion</article>
                <p>Whether you're a competitive gamer chasing every frame, a creator rendering 4K video, or a first-time builder nervous about your first PC - we're here to make your journey successful.</p>
                <p>We Believe:</p>
                <ul>
                    <li>Everyone deserves access to genuine, high-quality components</li>
                    <li>Honest advice beats aggressive selling every time</li>
                    <li>A trusted part is better than a "cheap deal"</li>
                    <li>Your PC should grow with you</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default AboutsUs;