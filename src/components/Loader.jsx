import React from 'react'
import { Sparkles, Coffee } from 'lucide-react'

export default function Loader({ text = "Բեռնվում է տիեզերական համերը..." }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(14, 20, 16, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            color: '#f3f4f6'
        }}>
            {/* CSS Breathing և Փայլող անիմացիաներ */}
            <style>
                {`
                    @keyframes breathing {
                        0% { transform: scale(0.95); opacity: 0.7; box-shadow: 0 0 15px rgba(194, 155, 105, 0.2); }
                        50% { transform: scale(1.08); opacity: 1; box-shadow: 0 0 35px rgba(194, 155, 105, 0.5); }
                        100% { transform: scale(0.95); opacity: 0.7; box-shadow: 0 0 15px rgba(194, 155, 105, 0.2); }
                    }
                    @keyframes pulseText {
                        0% { opacity: 0.5; }
                        50% { opacity: 1; }
                        100% { opacity: 0.5; }
                    }
                `}
            </style>

            {/* Շնչող (Breathing) կլոր կոնտեյներ */}
            <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2C3831, #161e19)',
                border: '1px solid rgba(194, 155, 105, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'breathing 2.5s infinite ease-in-out',
                marginBottom: '24px',
                position: 'relative'
            }}>
                <Coffee style={{ width: '38px', height: '38px', color: '#c29b69' }} />

                {/* Փոքրիկ փայլող աստղիկ վերևի անկյունում */}
                <Sparkles style={{
                    width: '18px',
                    height: '18px',
                    color: '#c29b69',
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    animation: 'pulseText 1.5s infinite'
                }} />
            </div>

            {/* Բեռնման տեքստը */}
            <p style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#b0b8b2',
                letterSpacing: '0.5px',
                animation: 'pulseText 2s infinite',
                margin: 0
            }}>
                {text}
            </p>
        </div>
    )
}