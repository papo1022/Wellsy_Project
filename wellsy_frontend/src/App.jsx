import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('백엔드 연결 확인 중...')

  useEffect(() => {
    fetch("http://localhost:8006/wellsy/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`)
        }

        return response.text()
      })
      .then((data) => {
        setMessage(data)
      })
      .catch((error) => {
        console.error(error)
        setMessage('백엔드 연결 실패')
      })
  }, [])

  return (
    <>
      <h1>Wellsy</h1>
      <p>{message}</p>
    </>
  )
}

export default App