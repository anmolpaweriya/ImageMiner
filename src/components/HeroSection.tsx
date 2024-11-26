import { Button } from './ui/button'

export default function HeroSection() {
    return (
        <section id="home" className="w-full  py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="flex flex-col items-center space-y-5 text-center">
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Image Miner
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        Your Web Images, Delivered as PDFs
                    </p>
                </div>
                <div className="space-x-4">
                    <Button variant="outline" asChild>
                        <a href="#contact">Contact Me</a>
                    </Button>
                    <Button asChild>
                        <a href="#about">Explore</a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
