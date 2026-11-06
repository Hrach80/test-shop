import React from 'react'
import { Sparkles, Coffee } from 'lucide-react'

export default function Loader() {
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
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            boxSizing: 'border-box'
        }}>
            {/* CSS Breathing և Փայլող անիմացիաներ */}
            <style>
                {`
                    @keyframes breathing {
                        0% { transform: scale(0.92); opacity: 0.7; box-shadow: 0 0 12px rgba(194, 155, 105, 0.2); }
                        50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 25px rgba(194, 155, 105, 0.45); }
                        100% { transform: scale(0.92); opacity: 0.7; box-shadow: 0 0 12px rgba(194, 155, 105, 0.2); }
                    }
                    @keyframes pulseSparkle {
                        0% { opacity: 0.4; }
                        50% { opacity: 1; }
                        100% { opacity: 0.4; }
                    }
                    @media (max-width: 600px) {
                        .loader-circle {
                            width: 65px !important;
                            height: 65px !important;
                        }
                        .loader-icon {
                            width: 28px !important;
                            height: 28px !important;
                        }
                    }
                `}
            </style>

            {/* Շնչող (Breathing) կլոր կոնտեյներ */}
            <div className="loader-circle" style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2C3831, #161e19)',
                border: '1px solid rgba(194, 155, 105, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'breathing 2.2s infinite ease-in-out',
                position: 'relative',
                boxSizing: 'border-box'
            }}>
                <Coffee className="loader-icon" style={{ width: '32px', height: '32px', color: '#c29b69' }} />

                {/* Փոքրիկ փայլող աստղիկ վերևի անկյունում */}
                <Sparkles style={{
                    width: '14px',
                    height: '14px',
                    color: '#c29b69',
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    animation: 'pulseSparkle 1.5s infinite'
                }} />
            </div>
        </div>
    )
}