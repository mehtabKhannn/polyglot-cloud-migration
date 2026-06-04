import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, Mail, Github, Linkedin, CheckCircle, Server, Database, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

const VERSION = "1.0.0";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [theme, setTheme] = useState('dark');
  const [status, setStatus] = useState({ api: 'checking', worker: 'checking', redis: 'checking' });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/status`);
        if (response.ok) {
          const data = await response.json();
          setStatus({
            api: 'online',
            worker: data.worker === 'running' ? 'online' : 'offline',
            redis: data.redis === 'connected' ? 'online' : 'offline'
          });
        } else {
          setStatus({ api: 'offline', worker: 'offline', redis: 'offline' });
        }
      } catch (error) {
        setStatus({ api: 'offline', worker: 'offline', redis: 'offline' });
      }
    };
    
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div className="App">
      <div className="version-badge">Version {VERSION}</div>
      
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Live System Status */}
      <div className="status-indicator">
        <div className="glass status-card">
          <Activity size={16} /> API: <span className={`dot ${status.api !== 'online' ? 'offline' : ''}`}></span>
        </div>
        <div className="glass status-card">
          <Server size={16} /> Worker: <span className={`dot ${status.worker !== 'online' ? 'offline' : ''}`}></span>
        </div>
        <div className="glass status-card">
          <Database size={16} /> Redis: <span className={`dot ${status.redis !== 'online' ? 'offline' : ''}`}></span>
        </div>
      </div>

      <main>
        {/* 1. HERO SECTION */}
        <section className="hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1>Mehtab Khan</h1>
              <div className="typing-effect">
                <h2>DevOps Engineer | Full Stack Developer | AI Enthusiast | Cyber Security Learner</h2>
              </div>
              <p style={{ maxWidth: '800px', margin: '0 auto 2rem', color: 'var(--text-color)', opacity: 0.8 }}>
                Passionate Computer Science student at Air University Islamabad with expertise in Full Stack Development, DevOps Engineering, Artificial Intelligence using Python, Cloud Computing, Infrastructure Automation, Containerization, CI/CD Pipelines, and Cyber Security. Focused on building scalable, secure, and cloud-native applications using modern technologies.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-primary"><Download size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Download Resume</button>
                <button className="btn btn-secondary"><Mail size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Contact Me</button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. ABOUT ME */}
        <section className="container">
          <div className="glass">
            <h2>About Me</h2>
            <div className="grid grid-2">
              <div>
                <p>BSCS Student at <strong>Air University Islamabad</strong> with a strong software engineering background.</p>
                <p>I specialize in building intelligent, scalable systems merging Full Stack Development, AI, and robust DevOps practices. From configuring AWS infrastructure with Terraform to setting up resilient CI/CD pipelines via Jenkins and GitHub Actions, I am obsessed with automation.</p>
              </div>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><CheckCircle size={16} color="var(--accent-color)" /> Python & Artificial Intelligence</li>
                <li><CheckCircle size={16} color="var(--accent-color)" /> Full Stack Development</li>
                <li><CheckCircle size={16} color="var(--accent-color)" /> Cloud Computing & AWS</li>
                <li><CheckCircle size={16} color="var(--accent-color)" /> DevOps & Infrastructure as Code</li>
                <li><CheckCircle size={16} color="var(--accent-color)" /> Docker, Swarm & CI/CD Pipelines</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section className="container">
          <h2>Technical Skills</h2>
          <div className="grid grid-3">
            <div className="glass">
              <h3>Programming</h3>
              <div className="badge">Python</div>
              <div className="badge">C++</div>
              <div className="badge">JavaScript</div>
              <div className="badge">C#</div>
              <div className="badge">SQL</div>
            </div>
            <div className="glass">
              <h3>Frontend & Backend</h3>
              <div className="badge">React</div>
              <div className="badge">HTML5/CSS3</div>
              <div className="badge">ASP.NET Core</div>
              <div className="badge">Flask</div>
              <div className="badge">REST APIs</div>
            </div>
            <div className="glass">
              <h3>DevOps & Cloud</h3>
              <div className="badge">Docker</div>
              <div className="badge">Docker Swarm</div>
              <div className="badge">Terraform</div>
              <div className="badge">Jenkins</div>
              <div className="badge">AWS</div>
            </div>
            <div className="glass">
              <h3>Databases</h3>
              <div className="badge">MySQL</div>
              <div className="badge">SQL Server</div>
              <div className="badge">MongoDB</div>
              <div className="badge">Redis</div>
            </div>
            <div className="glass">
              <h3>Cyber Security</h3>
              <div className="badge">Network Security</div>
              <div className="badge">Web Security</div>
              <div className="badge">Auth Concepts</div>
            </div>
            <div className="glass">
              <h3>Artificial Intelligence</h3>
              <div className="badge">Machine Learning</div>
              <div className="badge">Data Analysis</div>
              <div className="badge">Pandas/NumPy</div>
            </div>
          </div>
        </section>

        {/* 4. PROJECTS SECTION */}
        <section className="container">
          <h2>Featured Projects</h2>
          <div className="grid grid-2">
            <div className="glass">
              <h3>Polyglot Cloud Migration</h3>
              <p>Cloud-native three-tier application using React, ASP.NET Core, Python, Redis, Docker, Docker Swarm, Terraform, AWS, GitHub Actions, and Jenkins.</p>
            </div>
            <div className="glass">
              <h3>Hotel Reservation System</h3>
              <p>Object-Oriented C++ application implementing abstraction, inheritance, polymorphism, encapsulation, file handling, booking management, and payment processing.</p>
            </div>
            <div className="glass">
              <h3>ConnectSphere Social Media Database</h3>
              <p>SQL Server database project featuring joins, triggers, stored procedures, views, indexing, and database optimization.</p>
            </div>
            <div className="glass">
              <h3>Artificial Intelligence Projects</h3>
              <p>Python-based AI and Machine Learning solutions involving automation, predictive analytics, data processing, and intelligent systems.</p>
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE & 6. EDUCATION */}
        <section className="container">
          <div className="grid grid-2">
            <div>
              <h2>Experience</h2>
              <div className="glass" style={{ marginBottom: '1rem' }}>
                <h3>Aspiring DevOps Engineer</h3>
                <p>CI/CD Pipelines • Infrastructure Automation • Cloud Deployment • Dockerization</p>
              </div>
              <div className="glass" style={{ marginBottom: '1rem' }}>
                <h3>Full Stack Developer</h3>
                <p>Frontend Development • Backend APIs • Database Design • System Integration</p>
              </div>
              <div className="glass">
                <h3>AI Developer</h3>
                <p>Python Development • Data Analysis • Machine Learning • Automation</p>
              </div>
            </div>
            <div>
              <h2>Education</h2>
              <div className="glass">
                <h3>Bachelor of Science in Computer Science</h3>
                <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Air University Islamabad</p>
                <p><strong>Relevant Coursework:</strong> Software Engineering, Artificial Intelligence, Cloud Computing, Database Systems, Operating Systems, Computer Networks, Information Security</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CERTIFICATIONS */}
        <section className="container">
          <h2>Certifications</h2>
          <div className="grid grid-3">
            <div className="glass" style={{ textAlign: 'center' }}>AWS Cloud Practitioner</div>
            <div className="glass" style={{ textAlign: 'center' }}>Docker Fundamentals</div>
            <div className="glass" style={{ textAlign: 'center' }}>Terraform Associate</div>
            <div className="glass" style={{ textAlign: 'center' }}>GitHub Actions</div>
            <div className="glass" style={{ textAlign: 'center' }}>Cyber Security Fundamentals</div>
            <div className="glass" style={{ textAlign: 'center' }}>Python for AI & ML</div>
          </div>
        </section>

        {/* 8. CONTACT SECTION */}
        <section className="container" style={{ paddingBottom: '10rem' }}>
          <h2>Get In Touch</h2>
          <div className="glass">
            <div className="grid grid-2">
              <div>
                <p><Mail size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> mehtab@example.com</p>
                <p><Github size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> github.com/mehtabkhan</p>
                <p><Linkedin size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> linkedin.com/in/mehtabkhan</p>
                <p>📍 Islamabad, Pakistan</p>
              </div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Name" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc', background: 'var(--bg-color)', color: 'var(--text-color)' }} />
                <input type="email" placeholder="Email" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc', background: 'var(--bg-color)', color: 'var(--text-color)' }} />
                <textarea placeholder="Message" rows="4" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc', background: 'var(--bg-color)', color: 'var(--text-color)' }}></textarea>
                <button type="button" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
