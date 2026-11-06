import { BookOpen, Sparkles, Coffee, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Learn() {
    const { t } = useLanguage()

    const articles = [
        {
            id: 1,
            title: t('art1Title'),
            desc: t('art1Desc'),
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
            time: '5 min read',
            tag: 'Brewing'
        },
        {
            id: 2,
            title: t('art2Title'),
            desc: t('art2Desc'),
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
            time: '4 min read',
            tag: 'Guide'
        },
        {
            id: 3,
            title: t('art3Title'),
            desc: t('art3Desc'),
            image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
            time: '6 min read',
            tag: 'Beans'
        }
    ]

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            background: `linear-gradient(to bottom, rgba(14, 20, 16, 0.85), rgba(14, 20, 16, 0.95)), url('https://www.torrefacto.ru/upload/medialibrary/58d/902aex542rv7je68ckcxtxnrh4e9z144.png') center/cover no-repeat`,
            padding: '40px 20px',
            color: '#f3f4f6',
            boxSizing: 'border-box',
            width: '100%'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>

                {/* Վերնագիր */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        background: 'rgba(44, 56, 49, 0.7)',
                        border: '1px solid rgba(194, 155, 105, 0.4)',
                        color: '#c29b69',
                        fontSize: '12px',
                        marginBottom: '12px'
                    }}>
                        <BookOpen style={{ width: '13px', height: '13px' }} />
                        <span>Masterclass & Guides</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>
                        {t('learnTitle')}
                    </h1>
                    <p style={{ color: '#b0b8b2', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
                        {t('learnSubtitle')}
                    </p>
                </div>

                {/* Հոդվածների ցանկ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    paddingBottom: '40px'
                }}>
                    {articles.map((art) => (
                        <div key={art.id} style={{
                            background: 'rgba(22, 30, 25, 0.88)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '1px solid rgba(194, 155, 105, 0.3)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s ease',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                                <img src={art.image} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <span style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'rgba(18, 23, 20, 0.85)',
                                    color: '#c29b69',
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    border: '1px solid rgba(194,155,105,0.4)'
                                }}>
                                    {art.tag}
                                </span>
                            </div>

                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8c9590', fontSize: '12px', marginBottom: '8px' }}>
                                    <Clock style={{ width: '13px', height: '13px' }} />
                                    <span>{art.time}</span>
                                </div>

                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
                                    {art.title}
                                </h3>

                                <p style={{ color: '#b0b8b2', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                                    {art.desc}
                                </p>

                                <button
                                    onClick={() => alert(art.title)}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                                        color: '#f7f4ef',
                                        border: '1px solid rgba(194, 155, 105, 0.4)',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 15px rgba(44,56,49,0.5)'
                                    }}
                                >
                                    {t('readMore')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}