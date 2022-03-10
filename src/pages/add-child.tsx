import { openGuard } from "@kidneed/utils"
import { AddChildPage as Content } from "venus/AddChildPage/AddChildPage"

export default function AddChildPage() {
    return <Content />
}

AddChildPage.guard = openGuard