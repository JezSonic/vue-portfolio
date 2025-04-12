<script lang="ts" setup>
    import Tile from "@/components/tiles/Tile.vue";
</script>

<template>
    <div class="tos">
        <Tile title="Terms of Service">
            <p>Last updated: September 15, 2020</p>
            <p>This Terms of Services contains list of rules how I am working on commissions</p>
        </Tile>
        <Tile title="Important information">
            <h4>NSFW</h4>
            <p>I DO NOT DO websites with NSFW content</p>
            <h4>Privacy Policy and ToS on website</h4>
            <p>I will include that on your website ONLY if You will send me text content of that.</p>
            <h4>VAT invoices</h4>
            <p>I do not issue VAT invoices</p>
            <h4>Money</h4>
            <p>ONLY in case of problems with the order, such as I cannot complete it, I will
                refund the money.</p>
            <p>In other cases, I do not return the money</p>
            <p>If the order is canceled after payment, I will not refund the money.</p>
            <p>If an order is canceled before payment, EVERYTHING that has been created for the
                order will be deleted
            </p>
            <h4>Warranty and In-problem cases</h4>
            <p><strong>My code</strong> - the code that I wrote.</p>
            <p>
                This does not include code written e.g. on Google backend servers or on Google
                Firebase servers or any other services</p>
            <p>
                Warranty for my code to work: 1 Year
            </p>
            <p>
                The warranty covers website corrections during the warranty period for free. After the
                warranty period expires, I am not responsible for the operation of the code and I will not
                repair it.
            </p>
            <p>
                In case of any problems with the operation of the website: please let me know so
                I can take care of it
            </p>
            <p>
                In case of any problems with the operation of Google Firebase or any other services used on the website:
                please let me know
            </p>
            <p>Extra changes to the order, even the smallest, made after determining the
                content of the page will cost extra money</p>
        </Tile>
        <Tile title="Other services">
            <h4>Payment</h4>
            <p>Important payment information</p>
            <p>Supported payment services: PayPal, Wise, Revolut</p>
            <p>Currencies: USD</p>
            <strong>
                <i>I am not responsible for payment problems with services listed above - please contact their technical
                    support regarding the solution of the problem and inform me about the
                    situation
                </i>
            </strong>
            <h4>Google Firebase</h4>
            <p>I use Google Firebase services for hosting this website</p>
            <p>Google Firebase has its own Terms of Service at <a href="https://firebase.google.com/terms">https://firebase.google.com/terms</a>
            </p>
            <h4>Hosting, domains and other resources must be paid by the customer themselves</h4>
            <h4>How do I accept orders</h4>
            <p>First, you have to write to me on Discord. After determining the content of the page and
                obligatory acceptance by you, I will start working on the initial design.
            </p>
            <p>
                Changes made by you after starting work on the order WILL COST EXTRA
            </p>
            <p>
                After completing the initial design, I will arrange with you to show it in the form of a
                transmission of the design from my computer via Discord.
            </p>
            <p>
                After accepting the design, I will wait for payment (then, of course, you will get a link to
                paypal and the entire order summary, if you wish, don't be afraid).
            </p>
            <p>When the money arrives, I will start programming the website, if necessary. If not - I
                will send it to you right away in the form of html, js and css files with the required
                resources.</p>
            <p>
                If the use of Google Firebase was required, after payment you will get access to the entire
                Google Firebase project created for the website.</p>
            <p>
                If you plan to host a website on Google Firebase Hosting - you have to pay the cost of the
                Blaze plan for the project yourself and then I will help you with the configuration of
                everything (if it was not agreed at the beginning, you will have to pay a little more for
                help)
            </p>
            <h4>Security of Your Personal Data</h4>
            <p>The security of Your Personal Data is important to Us, but remember that no method of
                transmission over the Internet, or method of electronic storage is 100% secure. While We
                strive to use commercially acceptable means to protect Your Personal Data, We cannot
                guarantee its absolute security.</p>
            <p>For more info, please, look at our <a href="/privacy-policy/">Privacy Policy</a></p>
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