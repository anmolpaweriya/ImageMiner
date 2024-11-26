
export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Image Miner. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <a className="text-xs hover:underline underline-offset-4" href="#home">
                    Home
                </a>
                <a className="text-xs hover:underline underline-offset-4" href="#download">
                    Download
                </a>
                <a className="text-xs hover:underline underline-offset-4" href="#about">
                    About
                </a>
            </nav>
        </footer>
    )
}
