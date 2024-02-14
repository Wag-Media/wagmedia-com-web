import { Button } from "../ui/button"
import { Input } from "../ui/input"
import styles from "./newsletter.module.scss"

export function Newsletter() {
  return (
    <div className={styles.newsletter}>
      <h5 className="text-2xl mb-4 text-center text-black">
        Dive here into the weekly newsletter web
      </h5>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </div>
    </div>
  )
}
