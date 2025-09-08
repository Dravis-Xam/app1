export default function Footer() {
    return <footer>
        <div className="app-footer footer text-center p-4 bg-gray-800 text-white">
            <div className="miscellineous">
                <div className="flex items-center justify-center">
                    <a href="/about" className="mx-2 hover:text-green-200">About</a>
                    <a href="/contact" className="mx-2 hover:text-green-200">Contact</a>
                    <a href="/privacy" className="mx-2 hover:text-green-200">Privacy Policy</a>
                    <a href="/terms" className="mx-2 hover:text-green-200">Terms of Service</a>
                </div>
                <div className="flex items-center justify-center">
                    <a href="https://twitter.com/StreamX" className="mx-2 hover:text-green-200">Twitter</a>
                    <a href="https://facebook.com/StreamX" className="mx-2 hover:text-green-200">Facebook</a>
                    <a href="https://instagram.com/StreamX" className="mx-2 hover:text-green-200">Instagram</a>
                    <a href="https://linkedin.com/company/StreamX" className="mx-2 hover:text-green-200">LinkedIn</a>
                </div>
            </div>
            <p>&copy; 2024 StreamX. All rights reserved.</p>
        </div>
    </footer>;
}