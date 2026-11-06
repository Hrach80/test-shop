import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Coffee, ShieldCheck, Zap } from 'lucide-react'

export default function Home() {
    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '30px 20px',
            boxSizing: 'border-box',
            width: '100%'
        }}>
            <style>
                {`
                    @media (max-width: 900px) {
                        .home-features-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}
            </style>

            {/* Հիմնական կոնտեյներ, որը պահում է ամեն ինչ կենտրոնում և ունի հավասարաչափ մարջիններ */}
            <div style={{
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                boxSizing: 'border-box'
            }}>

                {/* Հերոս բաժին (Hero Section) */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1px solid rgba(194, 155, 105, 0.35)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                    background: `linear-gradient(to bottom, rgba(18, 23, 20, 0.85), rgba(18, 23, 20, 0.95)), url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1400') center/cover no-repeat`,
                    padding: '45px 25px',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                }}>

                    {/* Վերևի փայլուն պիտակ */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        background: 'rgba(44, 56, 49, 0.6)',
                        border: '1px solid rgba(194, 155, 105, 0.4)',
                        color: '#c29b69',
                        fontSize: '13px',
                        marginBottom: '16px',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)'
                    }}>
                        <Sparkles style={{ width: '14px', height: '14px' }} />
                        <span>Բարձր որակ և անզուգական համեր</span>
                    </div>

                    {/* Վերնագիր */}
                    <h1 style={{
                        fontSize: 'clamp(26px, 4vw, 42px)',
                        fontWeight: '900',
                        color: '#fff',
                        marginBottom: '14px',
                        lineHeight: '1.2'
                    }}>
                        Բացահայտեք Սուրճի և Թեյի Նոր <span style={{ background: 'linear-gradient(to right, #fff, #c29b69)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Մշակույթը</span>
                    </h1>

                    {/* Նկարագրություն */}
                    <p style={{
                        fontSize: '15px',
                        color: '#b0b8b2',
                        maxWidth: '650px',
                        margin: '0 auto 24px auto',
                        lineHeight: '1.5'
                    }}>
                        Հատուկ ընտրված բարձր որակի հատիկներ և բուսական թեյեր՝ պատրաստված ձեր անզուգական առավոտների և ջերմ երեկոների համար։
                    </p>

                    {/* Կոճակ՝ նուրբ հովեր անիմացիայով */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link
                            to="/shop"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)'
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(44,56,49,0.8), 0 0 20px rgba(194,155,105,0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)'
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(44,56,49,0.5)'
                            }}
                            style={{
                                padding: '12px 28px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                                color: '#f7f4ef',
                                fontWeight: '700',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 8px 20px rgba(44,56,49,0.5)',
                                border: '1px solid rgba(194, 155, 105, 0.4)',
                                fontSize: '14px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span>Անցնել Խանութ</span>
                            <ArrowRight style={{ width: '18px', height: '18px' }} />
                        </Link>
                    </div>
                </div>

                {/* Հիմնական Առավելությունների Բլոկ (Features Grid) */}
                <div className="home-features-grid" style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    boxSizing: 'border-box'
                }}>

                    {/* Քարտ 1 */}
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(194, 155, 105, 0.3)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                        background: `linear-gradient(to bottom, rgba(18, 23, 20, 0.8), rgba(18, 23, 20, 0.95)), url('https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600') center/cover no-repeat`,
                        padding: '20px',
                        backdropFilter: 'blur(8px)',
                        boxSizing: 'border-box'
                    }}>
                        <Coffee style={{ width: '30px', height: '30px', color: '#c29b69', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>100% Պրեմիում Հատիկներ</h3>
                        <p style={{ color: '#b0b8b2', fontSize: '13px', lineHeight: '1.4' }}>Բերված աշխարհի լավագույն պլանտացիաներից՝ հատուկ բուժիչ և հագեցած բույրով:</p>
                    </div>

                    {/* Քարտ 2 */}
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(194, 155, 105, 0.3)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                        background: `linear-gradient(to bottom, rgba(18, 23, 20, 0.8), rgba(18, 23, 20, 0.95)), url('https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600') center/cover no-repeat`,
                        padding: '20px',
                        backdropFilter: 'blur(8px)',
                        boxSizing: 'border-box'
                    }}>
                        <Zap style={{ width: '30px', height: '30px', color: '#c29b69', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>Արագ Առաքում Երևանում</h3>
                        <p style={{ color: '#b0b8b2', fontSize: '13px', lineHeight: '1.4' }}>Ձեր պատվերը կհասնի անմիջապես ձեր դուռը՝ թարմ և անթերի վիճակում:</p>
                    </div>

                    {/* Քարտ 3 */}
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(194, 155, 105, 0.3)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                        background: `linear-gradient(to bottom, rgba(18, 23, 20, 0.8), rgba(18, 23, 20, 0.95)), url('https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600') center/cover no-repeat`,
                        padding: '20px',
                        backdropFilter: 'blur(8px)',
                        boxSizing: 'border-box'
                    }}>
                        <ShieldCheck style={{ width: '30px', height: '30px', color: '#c29b69', marginBottom: '12px' }} />
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>Վստահելի Որակ</h3>
                        <p style={{ color: '#b0b8b2', fontSize: '13px', lineHeight: '1.4' }}>Խիստ վերահսկողություն յուրաքանչյուր տուփի և փաթեթավորման համար:</p>
                    </div>

                </div>

            </div>
        </div>
    )
}