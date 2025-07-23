import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [subscriptionType, setSubscriptionType] = useState('trial');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Functionality will be added later
    console.log('Signup form submitted:', { formData, selectedPlan, subscriptionType, agreeToTerms });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Logo and Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
            <div style={{
              position: 'relative',
              marginRight: '12px'
            }}>
            
            </div>
        <img src={process.env.PUBLIC_URL + '/parkwise-logo.png'} alt="ParkWise Logo" style={{ height: '51px', width: '122px', marginRight: '10px' }} />
           
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2c3e50',
            margin: '0',
            marginBottom: '5px'
          }}>
            Get Started with ParkWise
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#7f8c8d',
            margin: '0'
          }}>
            Find the perfect parking spot in Paris
          </p>
        </div>

        {/* Plan Selection */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{
            display: 'flex',
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '4px',
            border: '1px solid #e9ecef'
          }}>
            <button
              onClick={() => setSelectedPlan('basic')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                background: selectedPlan === 'basic' ? '#1886ff' : 'transparent',
                color: selectedPlan === 'basic' ? 'white' : '#6c757d',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Basic
            </button>
            <button
              onClick={() => setSelectedPlan('premium')}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                background: selectedPlan === 'premium' ? '#1886ff' : 'transparent',
                color: selectedPlan === 'premium' ? 'white' : '#6c757d',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Premium
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1886ff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1886ff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1886ff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1886ff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          {/* Subscription Options */}
          <div style={{ marginBottom: '25px' }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="subscription"
                  value="trial"
                  checked={subscriptionType === 'trial'}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                  Free Trial (7 days)
                </span>
              </label>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="subscription"
                  value="monthly"
                  checked={subscriptionType === 'monthly'}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                  Premium Monthly - €4,99
                </span>
              </label>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="subscription"
                  value="yearly"
                  checked={subscriptionType === 'yearly'}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                  Premium Yearly - €49,99
                </span>
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                style={{ marginRight: '10px', marginTop: '2px' }}
              />
              <span style={{ fontSize: '13px', color: '#6c757d', lineHeight: '1.4' }}>
                I agree to the{' '}
                <span style={{ color: '#1886ff', textDecoration: 'underline', cursor: 'pointer' }}>
                  Terms of Service
                </span>{' '}
                and{' '}
                <span style={{ color: '#1886ff', textDecoration: 'underline', cursor: 'pointer' }}>
                  Privacy Policy
                </span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: '#1886ff',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => e.target.style.background = '#1565c0'}
            onMouseOut={(e) => e.target.style.background = '#1886ff'}
          >
            Start Subscription
          </button>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6c757d' }}>
              Already have an account?{' '}
            </span>
            <Link to="/login" style={{ 
              color: '#1886ff', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup; 