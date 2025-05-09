<script lang="ts" setup>
    import Tile from "@/components/tiles/Tile.vue";
</script>

<template>
    <div class="tos">
        <Tile title="Terms of Service">
            <p class="text-white">Last updated: September 15, 2020</p>
            <p class="text-white">This Terms of Services contains list of rules how I am working on commissions</p>
        </Tile>
        <Tile title="Important information">
            <h4 class="text-white">NSFW</h4>
            <p class="text-white">I DO NOT DO websites with NSFW content</p>
            <h4 class="text-white">Privacy Policy and ToS on website</h4>
            <p class="text-white">I will include that on your website ONLY if You will send me text content of that.</p>
            <h4 class="text-white">VAT invoices</h4>
            <p class="text-white">I do not issue VAT invoices</p>
            <h4 class="text-white">Money</h4>
            <p class="text-white">ONLY in case of problems with the order, such as I cannot complete it, I will
                refund the money.</p>
            <p class="text-white">In other cases, I do not return the money</p>
            <p class="text-white">If the order is canceled after payment, I will not refund the money.</p>
            <p class="text-white">If an order is canceled before payment, EVERYTHING that has been created for the
                order will be deleted
            </p>
            <h4 class="text-white">Warranty and In-problem cases</h4>
            <p class="text-white"><strong>My code</strong> - the code that I wrote.</p>
            <p class="text-white">
                This does not include code written e.g. on Google backend servers or on Google
                Firebase servers or any other services</p>
            <p class="text-white">
                Warranty for my code to work: 1 Year
            </p>
            <p class="text-white">
                The warranty covers website corrections during the warranty period for free. After the
                warranty period expires, I am not responsible for the operation of the code and I will not
                repair it.
            </p>
            <p class="text-white">
                In case of any problems with the operation of the website: please let me know so
                I can take care of it
            </p>
            <p class="text-white">
                In case of any problems with the operation of Google Firebase or any other services used on the website:
                please let me know
            </p>
            <p class="text-white">Extra changes to the order, even the smallest, made after determining the
                content of the page will cost extra money</p>
        </Tile>
        <Tile title="Other services">
            <h4 class="text-white">Payment</h4>
            <p class="text-white">Important payment information</p>
            <p class="text-white">Supported payment services: PayPal, Wise, Revolut</p>
            <p class="text-white">Currencies: USD</p>
            <strong>
                <i class="text-white">I am not responsible for payment problems with services listed above - please contact their technical
                    support regarding the solution of the problem and inform me about the
                    situation
                </i>
            </strong>
            <h4 class="text-white">Google Firebase</h4>
            <p class="text-white">I use Google Firebase services for hosting this website</p>
            <p class="text-white">Google Firebase has its own Terms of Service at <a href="https://firebase.google.com/terms">https://firebase.google.com/terms</a>
            </p>
            <h4 class="text-white">Hosting, domains and other resources must be paid by the customer themselves</h4>
            <h4 class="text-white">How do I accept orders</h4>
            <p class="text-white">First, you have to write to me on Discord. After determining the content of the page and
                obligatory acceptance by you, I will start working on the initial design.
            </p>
            <p class="text-white">
                Changes made by you after starting work on the order WILL COST EXTRA
            </p>
            <p class="text-white">
                After completing the initial design, I will arrange with you to show it in the form of a
                transmission of the design from my computer via Discord.
            </p>
            <p class="text-white">
                After accepting the design, I will wait for payment (then, of course, you will get a link to
                paypal and the entire order summary, if you wish, don't be afraid).
            </p>
            <p class="text-white">When the money arrives, I will start programming the website, if necessary. If not - I
                will send it to you right away in the form of html, js and css files with the required
                resources.</p>
            <p class="text-white">
                If the use of Google Firebase was required, after payment you will get access to the entire
                Google Firebase project created for the website.</p>
            <p class="text-white">
                If you plan to host a website on Google Firebase Hosting - you have to pay the cost of the
                Blaze plan for the project yourself and then I will help you with the configuration of
                everything (if it was not agreed at the beginning, you will have to pay a little more for
                help)
            </p>
            <h4 class="text-white">Security of Your Personal Data</h4>
            <p class="text-white">The security of Your Personal Data is important to Us, but remember that no method of
                transmission over the Internet, or method of electronic storage is 100% secure. While We
                strive to use commercially acceptable means to protect Your Personal Data, We cannot
                guarantee its absolute security.</p>
            <p class="text-white">For more info, please, look at our <a href="/privacy-policy/">Privacy Policy</a></p>
        </Tile>
    </div>
</template>

<style lang="scss" scoped>
.tos {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>