<script lang="ts" setup>
import Tile from "@/components/tiles/Tile.vue";
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Header Section -->
        <div class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-blue-600 mb-2">Terms of Service</h1>
            <p class="text-gray-400">Last updated: September 15, 2020</p>
        </div>

        <!-- Introduction -->
        <Tile title="Introduction" class="mb-8">
            <p class="text-white text-lg">
                This Terms of Service contains a list of rules regarding how I work on commissions. 
                Please read this document carefully before engaging my services.
            </p>
        </Tile>

        <!-- Important Information -->
        <Tile title="Important Information" class="mb-8">
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Content Restrictions</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">NSFW Content</h4>
                    <p class="text-white text-lg">I DO NOT create websites with NSFW content.</p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Documentation</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">Privacy Policy and ToS</h4>
                    <p class="text-white text-lg">
                        I will include Privacy Policy and Terms of Service on your website ONLY if you provide the text content for these documents.
                    </p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Billing</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">VAT Invoices</h4>
                    <p class="text-white text-lg">I do not issue VAT invoices.</p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Refund Policy</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <p class="text-white text-lg mb-3">
                        Refunds will ONLY be issued in case of problems with the order where I cannot complete it.
                    </p>
                    <ul class="space-y-2 text-white text-lg">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>In other cases, I do not return the money.</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>If the order is canceled after payment, I will not refund the money.</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>If an order is canceled before payment, EVERYTHING that has been created for the order will be deleted.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Warranty and Support</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">Warranty Coverage</h4>
                    <p class="text-white text-lg mb-3">
                        <strong>My code</strong> - refers to the code that I personally wrote. This does not include code written on Google backend servers, 
                        Google Firebase servers, or any other third-party services.
                    </p>
                    <p class="text-white text-lg mb-3">
                        Warranty for my code to work: <span class="text-blue-400 font-semibold">1 Year</span>
                    </p>
                    <p class="text-white text-lg mb-3">
                        The warranty covers website corrections during the warranty period for free. After the
                        warranty period expires, I am not responsible for the operation of the code and I will not
                        repair it.
                    </p>

                    <h4 class="text-lg font-medium text-blue-400 mt-4 mb-2">Support</h4>
                    <p class="text-white text-lg mb-3">
                        In case of any problems with the operation of the website: please let me know so
                        I can take care of it.
                    </p>
                    <p class="text-white text-lg mb-3">
                        In case of any problems with the operation of Google Firebase or any other services used on the website:
                        please let me know.
                    </p>

                    <h4 class="text-lg font-medium text-blue-400 mt-4 mb-2">Changes to Orders</h4>
                    <p class="text-white text-lg">
                        Extra changes to the order, even the smallest ones, made after determining the
                        content of the page will cost extra money.
                    </p>
                </div>
            </div>
        </Tile>

        <!-- Payment and Services -->
        <Tile title="Payment and Services" class="mb-8">
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Payment Information</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <p class="text-white text-lg mb-3">Supported payment services:</p>
                    <ul class="space-y-2 text-white text-lg mb-3">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>PayPal</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>Wise</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>Revolut</span>
                        </li>
                    </ul>
                    <p class="text-white text-lg mb-3">Accepted currencies: <span class="text-blue-400 font-semibold">USD</span></p>
                    <p class="text-white text-lg italic">
                        I am not responsible for payment problems with services listed above - please contact their technical
                        support regarding the solution of the problem and inform me about the situation.
                    </p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Third-Party Services</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">Google Firebase</h4>
                    <p class="text-white text-lg mb-3">
                        I use Google Firebase services for hosting this website.
                    </p>
                    <p class="text-white text-lg mb-3">
                        Google Firebase has its own Terms of Service at 
                        <a class="font-semibold text-blue-600 hover:text-blue-500" href="https://firebase.google.com/terms">https://firebase.google.com/terms</a>
                    </p>
                    <p class="text-white text-lg">
                        Hosting, domains, and other resources must be paid by the customer themselves.
                    </p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Order Process</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <ol class="space-y-3 text-white text-lg">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">1.</span>
                            <span>First, you have to write to me on Discord. After determining the content of the page and
                                obligatory acceptance by you, I will start working on the initial design.</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">2.</span>
                            <span>After completing the initial design, I will arrange with you to show it in the form of a
                                transmission of the design from my computer via Discord.</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">3.</span>
                            <span>After accepting the design, I will wait for payment (then, of course, you will get a link to
                                PayPal and the entire order summary, if you wish).</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">4.</span>
                            <span>When the money arrives, I will start programming the website, if necessary. If not - I
                                will send it to you right away in the form of HTML, JS, and CSS files with the required
                                resources.</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">5.</span>
                            <span>If the use of Google Firebase was required, after payment you will get access to the entire
                                Google Firebase project created for the website.</span>
                        </li>
                    </ol>

                    <p class="text-white text-lg mt-4 font-semibold text-red-400">
                        Changes made by you after starting work on the order WILL COST EXTRA.
                    </p>

                    <p class="text-white text-lg mt-4">
                        If you plan to host a website on Google Firebase Hosting - you have to pay the cost of the
                        Blaze plan for the project yourself and then I will help you with the configuration of
                        everything (if it was not agreed at the beginning, you will have to pay a little more for
                        help).
                    </p>
                </div>
            </div>
        </Tile>

        <!-- Data Security -->
        <Tile title="Data Security">
            <div class="bg-gray-700 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">Security of Your Personal Data</h3>
                <p class="text-white text-lg mb-4">
                    The security of Your Personal Data is important to Us, but remember that no method of
                    transmission over the Internet, or method of electronic storage is 100% secure. While We
                    strive to use commercially acceptable means to protect Your Personal Data, We cannot
                    guarantee its absolute security.
                </p>
                <p class="text-white text-lg">
                    For more information, please refer to our 
                    <a class="font-semibold text-blue-600 hover:text-blue-500" href="/privacy-policy/">Privacy Policy</a>.
                </p>
            </div>
        </Tile>
    </div>
</template>

<style lang="scss" scoped>
/* No additional styling needed as we're using Tailwind classes */
</style>
