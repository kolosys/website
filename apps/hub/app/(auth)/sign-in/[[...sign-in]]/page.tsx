import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return <SignIn
        appearance={{
            theme: "simple"
        }}
        routing="path"
        path="/sign-in"
        fallbackRedirectUrl="/"
        forceRedirectUrl="/"
    />
}