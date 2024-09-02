import './../assets/css/components/massage.css'

export default function Massage({ massage, children }) {
  return (
    <div className="massage">{massage}{children}</div>
  )
}
