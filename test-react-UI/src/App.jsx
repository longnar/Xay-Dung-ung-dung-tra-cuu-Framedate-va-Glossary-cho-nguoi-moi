import { useEffect, useRef, useState } from 'react'
import heroArtImage from './assets/IdolShowdownNextFesBiboo_1.png'
import contactCharacterImage from './assets/fbk-eating.gif'
import gameLogo from './assets/IdolShowdownNF_logo.png'
import brandIcon from './assets/IdolShowdownIcon.png'
import pixelFubuki from './assets/Pixel Fubuki.png'
import pixelKoyori from './assets/Pixel Koyori.png'
import selectionFrame from './assets/selection-frame.svg'
import selectionPolygon from './assets/selection-polygon.svg'
import { decodeBase64Image } from './utils/decodeImage'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [glossaryDraft, setGlossaryDraft] = useState({ image: '', text: '' })
  const [activeCard, setActiveCard] = useState(0)
  const [isCardSliding, setIsCardSliding] = useState(false)
  const [isCardResetting, setIsCardResetting] = useState(false)
  const [selectionAddImage, setSelectionAddImage] = useState('')
  const [selectionAddImagePosition, setSelectionAddImagePosition] = useState({ x: 0, y: 0 })
  const selectionAddDragRef = useRef(null)
  const [characterCards, setCharacterCards] = useState([])
  const [cardUrls, setCardUrls] = useState({})
  const cardUrlsRef = useRef({})

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsLoginOpen(false)
      }
    }

    document.body.classList.toggle('modal-open', isLoginOpen)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [isLoginOpen])

  useEffect(() => {
    let isMounted = true

    fetch('/cards/manifest.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load card manifest: ${response.status}`)
        }
        return response.json()
      })
      .then((manifest) => {
        if (isMounted) {
          setCharacterCards(manifest)
        }
      })
      .catch((error) => {
        console.error('Unable to load encoded character cards.', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (characterCards.length === 0) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setIsCardSliding(true)

      window.setTimeout(() => {
        setActiveCard((current) => (current + 1) % characterCards.length)
        setIsCardResetting(true)
        setIsCardSliding(false)
        window.requestAnimationFrame(() => {
          setIsCardResetting(false)
        })
      }, 650)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [characterCards.length])

  useEffect(() => {
    if (characterCards.length === 0) {
      return undefined
    }

    let isMounted = true
    const indicesToLoad = [activeCard, (activeCard + 1) % characterCards.length]

    Promise.all(indicesToLoad.map(async (index) => {
      const card = characterCards[index]
      if (cardUrlsRef.current[card.name]) {
        return [card.name, cardUrlsRef.current[card.name]]
      }

      const response = await fetch(`/cards/${encodeURIComponent(card.file)}`)
      if (!response.ok) {
        throw new Error(`Unable to load encoded card: ${card.file}`)
      }
      const encodedText = await response.text()
      const objectUrl = decodeBase64Image(encodedText, card.mimeType)
      cardUrlsRef.current[card.name] = objectUrl
      return [card.name, objectUrl]
    }))
      .then((loadedCards) => {
        if (isMounted) {
          setCardUrls((current) => Object.fromEntries([...Object.entries(current), ...loadedCards]))
        }
      })
      .catch((error) => {
        console.error('Unable to decode character card.', error)
      })

    return () => {
      isMounted = false
    }
  }, [activeCard, characterCards])

  useEffect(() => () => {
    Object.values(cardUrlsRef.current).forEach((objectUrl) => URL.revokeObjectURL(objectUrl))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoginOpen(false)
    setIsAuthenticated(true)
    setActivePage('selection')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActivePage('home')
  }

  const handleSelectionAddImage = (event) => {
    const [file] = event.target.files
    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      console.error('The selected file is not an image.')
      event.target.value = ''
      return
    }

    const imageUrl = URL.createObjectURL(file)
    setSelectionAddImagePosition({ x: 0, y: 0 })
    setSelectionAddImage((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl)
      }
      return imageUrl
    })
    event.target.value = ''
  }

  const handleSelectionAddImagePointerDown = (event) => {
    if (!selectionAddImage) {
      return
    }

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    selectionAddDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: selectionAddImagePosition.x,
      originY: selectionAddImagePosition.y,
    }
  }

  const handleSelectionAddImagePointerMove = (event) => {
    const drag = selectionAddDragRef.current
    if (!drag || drag.pointerId !== event.pointerId) {
      return
    }

    setSelectionAddImagePosition({
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    })
  }

  const handleSelectionAddImagePointerUp = (event) => {
    if (selectionAddDragRef.current?.pointerId === event.pointerId) {
      selectionAddDragRef.current = null
    }
  }

  useEffect(() => () => {
    if (selectionAddImage) {
      URL.revokeObjectURL(selectionAddImage)
    }
  }, [selectionAddImage])

  const renderHome = () => (
    <>
      <header className="site-header">
        <nav className="main-nav" aria-label="Điều hướng chính">
          <button type="button" className="nav-link" onClick={() => setActivePage('home')}>
            Replay
          </button>
          <button type="button" className="nav-link" onClick={() => setActivePage('home')}>
            News
          </button>
          <button type="button" className="nav-link" onClick={() => setActivePage('contacts')}>
            Contacts
          </button>
          <button type="button" className="login-trigger" onClick={isAuthenticated ? handleLogout : () => setIsLoginOpen(true)}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-art" aria-hidden="true" style={{ backgroundImage: `url(${heroArtImage})` }} />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <img className="game-logo" src={gameLogo} alt="Idol Showdown Next Fest" />
            <p className="game-meta">
              Date Release : 6 May, 2023
              <br />
              Last update : 7 June,2026
              <br />
              Developer : Besto Game Team
            </p>
            <a
              className="download-button"
              href="https://store.steampowered.com/app/1742020/Idol_Showdown/"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
          </div>
        </section>

        <section className="home-lower">
          <div className="home-copy">
            <section className="intro" id="about">
              <p>
                Được phát triển bởi Besto Games - 1 đội ngũ indie, với niềm đam mê game đối kháng
                và Idol của mình họ đã dành trọn 2 năm để phát triển tựa game Idol Showdown này.
              </p>
            </section>

            <section className="welcome">
              <p>
                Đây là một tựa game đối kháng (Fighting Game) sở hữu lối chơi vô cùng mượt mà, nhưng
                lại cực kỳ thân thiện và dễ dàng tiếp cận ngay cả khi bạn là người mới bắt đầu bước
                chân vào thể loại này.
              </p>
              <p>
                Để bắt đầu trải nghiệm, bạn muốn khám phá danh sách Nhân vật trước hay tìm hiểu về các
                Định nghĩa/Thuật ngữ trong game trước?
              </p>
            </section>
          </div>

          <aside className="character-carousel" aria-label="Thẻ nhân vật">
            <div className="carousel-frame">
              <div className={`carousel-track ${isCardSliding ? 'is-sliding' : ''} ${isCardResetting ? 'is-resetting' : ''}`}>
                {characterCards.length > 0 && cardUrls[characterCards[activeCard].name] && (
                  <img
                    className="carousel-card carousel-card-current"
                    src={cardUrls[characterCards[activeCard].name]}
                    alt={`${characterCards[activeCard].name} character card`}
                  />
                )}
                {characterCards.length > 0 && cardUrls[characterCards[(activeCard + 1) % characterCards.length].name] && (
                  <img
                    className="carousel-card carousel-card-next"
                    src={cardUrls[characterCards[(activeCard + 1) % characterCards.length].name]}
                    alt=""
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            <p className="carousel-caption">{characterCards.length > 0 ? characterCards[activeCard].name : 'Loading...'}</p>
          </aside>
        </section>

        <section className="directory" aria-label="Khám phá nội dung">
          <button type="button" className="directory-card" onClick={() => setActivePage('selection')}>
            Character
          </button>
          <button type="button" className="directory-card" onClick={() => setActivePage('glossary')}>
            Glossary
          </button>
        </section>
      </main>

      <footer id="footer" />
    </>
  )

  const renderContacts = () => (
    <main className="contacts-screen">
      <button type="button" className="back-button" aria-label="Quay lại trang chính" onClick={() => setActivePage('home')}>
        <img src={brandIcon} alt="" />
      </button>

      <img className="contacts-logo" src={gameLogo} alt="Idol Showdown Next Fest" />

      <section className="contacts-panel" aria-labelledby="contacts-title">
        <h1 id="contacts-title">Các trang liên hệ chính thức:</h1>
        <div className="contact-group">
          <p>X:</p>
          <a href="https://x.com/IdolShowdown" target="_blank" rel="noreferrer">
            Idol Showdown: hololive Fighting Game
          </a>
        </div>
        <div className="contact-group">
          <p>Youtube:</p>
          <a href="https://www.youtube.com/@IdolShowdown" target="_blank" rel="noreferrer">
            Idol Showdown | Besto Game Team
          </a>
        </div>
        <h2>Cộng đồng nước ngoài:</h2>
        <div className="contact-group">
          <p>Discord:</p>
          <a href="https://discord.gg/Kubkah7Ut" target="_blank" rel="noreferrer">
            Idol Showdown
          </a>
        </div>
        <h2>Cộng đồng Việt Nam:</h2>
        <p className="unavailable">Facebook: Đang cập nhật</p>
        <p className="unavailable">Discord: Đang cập nhật</p>
      </section>

      <img className="contacts-character" src={contactCharacterImage} alt="" />
    </main>
  )

  const renderGlossary = () => (
    <main className="glossary-screen">
      <button type="button" className="glossary-center-mark" onClick={() => setActivePage('home')} aria-label="Quay lại trang trước">
        <img src={brandIcon} alt="Quay lại" />
      </button>

      <button type="button" className="glossary-panel basic" onClick={() => setActivePage(isAuthenticated ? 'glossary-basic' : 'glossary-basic-view')} aria-label="Mở phần Basic glossary">
        <div className="panel-visual" />
        <img className="panel-character" src={pixelFubuki} alt="" />
        <div className="panel-content">
          <h1>BASIC</h1>
          <p>Những thứ cơ bản nhất về Fighting game mà bạn muốn biết để làm quen với mọi Fighting game</p>
        </div>
      </button>

      <button type="button" className="glossary-panel advanced" onClick={() => setActivePage(isAuthenticated ? 'glossary-advanced' : 'glossary-advanced-view')} aria-label="Mở phần Advanced glossary">
        <div className="panel-visual" />
        <img className="panel-character" src={pixelKoyori} alt="" />
        <div className="panel-content">
          <h2>ADVANCED</h2>
          <p>Những thứ nâng cao hơn nếu bạn muốn cải thiện trình độ hoặc muốn hiểu sâu hơn về Fighting game</p>
        </div>
      </button>
    </main>
  )

  const renderGlossaryAdmin = (type) => {
    const isBasic = type === 'basic'
    const title = isBasic ? 'Basic' : 'Advanced'

    return (
      <main className={`glossary-admin-screen ${isBasic ? 'admin-basic' : 'admin-advanced'}`} aria-label={`Quản lý mục Glossary ${title}`}>
        <button type="button" className="admin-back-button" onClick={() => setActivePage('glossary')} aria-label="Quay lại Glossary">
          <span aria-hidden="true">←</span>
        </button>

        <section className="admin-panel" aria-label={`Thêm nội dung ${title}`}>
          <aside className="left-panel" aria-label={`Sidebar ${title}`}>
            <button type="button" className="add-button" onClick={() => setGlossaryDraft({ image: '', text: '' })}>
              <span className="plus" aria-hidden="true">+</span>
              <span className="button-text">Thêm</span>
            </button>
          </aside>

          <div className="right-panel" aria-label={`Khu vực chỉnh sửa ${title}`}>
            <button type="button" className="upload-box" aria-label="Thêm hình ảnh">
              <span className="image-plus" aria-hidden="true">+</span>
            </button>
            <textarea
              className="text-box"
              value={glossaryDraft.text}
              onChange={(event) => setGlossaryDraft({ ...glossaryDraft, text: event.target.value })}
              placeholder={`Nội dung Glossary ${title}`}
              aria-label={`Nội dung Glossary ${title}`}
            />
          </div>

          <div className="admin-actions">
            <button type="button" className="action-button" onClick={() => setGlossaryDraft({ ...glossaryDraft })}>Chỉnh sửa</button>
            <button type="button" className="action-button save-button" onClick={() => setActivePage('glossary')}>Lưu</button>
          </div>
        </section>
      </main>
    )
  }

  const renderGlossaryView = (type) => {
    const isBasic = type === 'basic'
    const title = isBasic ? 'BASIC' : 'ADVANCED'
    const description = isBasic
      ? 'Những thứ cơ bản nhất về Fighting game mà bạn muốn biết để làm quen với mọi Fighting game.'
      : 'Những thứ nâng cao hơn nếu bạn muốn cải thiện trình độ hoặc muốn hiểu sâu hơn về Fighting game.'

    return (
      <main className={`glossary-view-screen ${isBasic ? 'view-basic' : 'view-advanced'}`} aria-label={`Glossary ${title}`}>
        <button type="button" className="admin-back-button" onClick={() => setActivePage('glossary')} aria-label="Quay lại Glossary">
          <span aria-hidden="true">←</span>
        </button>
        <article className="glossary-view-card">
          <h1>{title}</h1>
          <p>{description}</p>
          <p className="glossary-view-placeholder">Nội dung đang được cập nhật.</p>
        </article>
      </main>
    )
  }

  const renderSelection = () => (
    <main className="selection-screen" aria-label="Chọn chế độ Idol Showdown">
      <div className="selection-diamond" aria-hidden="true" />

      <button type="button" className="back-button selection-back" onClick={() => setActivePage('home')} aria-label="Quay lại trang trước">
        <svg className="selection-icon-svg" viewBox="0 0 269 269" role="img" aria-label="Quay lại">
          <path
            className="selection-hitbox"
            d="M34 132C28 89 52 52 95 31C126 16 165 16 201 31C228 43 246 56 260 75C272 92 271 111 256 124C238 139 218 154 204 166C189 178 180 191 171 198C158 208 145 209 131 204C112 197 102 180 91 180C71 180 60 194 53 209C46 224 33 232 19 226C8 220 7 205 12 189C16 171 21 155 34 132Z"
          />
          <image href={brandIcon} x="0" y="0" width="269" height="269" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </button>

      {isAuthenticated && (
        <button type="button" className="add-selection" onClick={() => setActivePage('selection-add')} aria-label="Thêm lựa chọn">
          +
        </button>
      )}
    </main>
  )

  const renderSelectionAdd = () => (
    <main className="selection-add-screen" aria-label="Màn hình thêm nhân vật">
      <div className="selection-add-decor" aria-hidden="true">
        <img className="selection-add-frame" src={selectionFrame} alt="" />
        <img className="selection-add-polygon" src={selectionPolygon} alt="" />
      </div>

      <button type="button" className="selection-add-back" onClick={() => setActivePage('selection')} aria-label="Quay lại màn hình selection">
        <span aria-hidden="true">←</span>
      </button>

      <section className="selection-add-image-panel" aria-label="Khu vực thêm ảnh nhân vật">
        <button type="button" className="selection-add-upload" aria-label="Thêm ảnh nhân vật">
          <span aria-hidden="true">+</span>
        </button>
      </section>

      <section className="selection-add-details" aria-label="Thông tin nhân vật">
        <label className={`selection-add-logo-slot ${selectionAddImage ? 'has-image' : ''}`}>
          {selectionAddImage ? (
            <img
              src={selectionAddImage}
              alt="Logo nhân vật đã tải lên"
              style={{ transform: `translate(${selectionAddImagePosition.x}px, ${selectionAddImagePosition.y}px)` }}
              onPointerDown={handleSelectionAddImagePointerDown}
              onPointerMove={handleSelectionAddImagePointerMove}
              onPointerUp={handleSelectionAddImagePointerUp}
              onPointerCancel={handleSelectionAddImagePointerUp}
            />
          ) : (
            <span aria-hidden="true">+</span>
          )}
          <input type="file" accept="image/*" onChange={handleSelectionAddImage} aria-label="Tải lên logo nhân vật" />
        </label>
        <label className="selection-add-description">
          <span>Thêm thông tin mô tả</span>
          <textarea aria-label="Thông tin mô tả" placeholder="Nhập mô tả nhân vật" />
        </label>
        <div className="selection-add-actions">
          <button type="button" className="selection-add-action">Chỉnh sửa</button>
          <button type="button" className="selection-add-action selection-add-save" onClick={() => setActivePage('selection')}>Lưu</button>
        </div>
        <button type="button" className="selection-add-detail-button" onClick={() => setActivePage('home')}>Chi Tiết</button>
      </section>
    </main>
  )

  const renderPage = () => {
    switch (activePage) {
      case 'contacts':
        return renderContacts()
      case 'glossary':
        return renderGlossary()
      case 'glossary-basic':
        return isAuthenticated ? renderGlossaryAdmin('basic') : renderGlossaryView('basic')
      case 'glossary-advanced':
        return isAuthenticated ? renderGlossaryAdmin('advanced') : renderGlossaryView('advanced')
      case 'glossary-basic-view':
        return renderGlossaryView('basic')
      case 'glossary-advanced-view':
        return renderGlossaryView('advanced')
      case 'selection-add':
        return isAuthenticated ? renderSelectionAdd() : renderSelection()
      case 'selection':
        return renderSelection()
      default:
        return renderHome()
    }
  }

  return (
    <div className="page-shell">
      {renderPage()}

      <div className={`login-modal ${isLoginOpen ? '' : 'hidden'}`} role="dialog" aria-modal="true" aria-labelledby="login-title">
        <div className="login-modal-backdrop" onClick={() => setIsLoginOpen(false)} aria-hidden="true" />
        <section className="login-modal-panel">
          <button className="login-close" type="button" aria-label="Đóng cửa sổ đăng nhập" onClick={() => setIsLoginOpen(false)}>
            &times;
          </button>
          <img className="login-modal-logo" src={gameLogo} alt="Idol Showdown Next Fest" />
          <form className="login-modal-form" id="login-form" onSubmit={handleSubmit}>
            <h1 id="login-title">Đăng nhập để chỉnh sửa thông tin</h1>
            <label htmlFor="modal-username">Tên đăng nhập</label>
            <input id="modal-username" name="username" type="text" autoComplete="username" required />
            <label htmlFor="modal-password">Mật khẩu</label>
            <input id="modal-password" name="password" type="password" autoComplete="current-password" required />
            <button type="submit">Đăng nhập</button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default App
