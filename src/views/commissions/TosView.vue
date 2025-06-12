<script lang="ts" setup>
import Tile from "@/components/tiles/Tile.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Header Section -->
        <div class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-blue-600 mb-2">{{ t('tosView.title') }}</h1>
            <p class="text-gray-400">{{ t('tosView.lastUpdated') }}</p>
        </div>

        <!-- Introduction -->
        <Tile :title="t('tosView.introduction.title')" class="mb-8">
            <p class="text-white text-lg">
                {{ t('tosView.introduction.content') }}
            </p>
        </Tile>

        <!-- Important Information -->
        <Tile :title="t('tosView.importantInfo.title')" class="mb-8">
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.importantInfo.contentRestrictions.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">{{ t('tosView.importantInfo.contentRestrictions.nsfw.title') }}</h4>
                    <p class="text-white text-lg">{{ t('tosView.importantInfo.contentRestrictions.nsfw.content') }}</p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.importantInfo.documentation.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">{{ t('tosView.importantInfo.documentation.privacyAndTos.title') }}</h4>
                    <p class="text-white text-lg">
                        {{ t('tosView.importantInfo.documentation.privacyAndTos.content') }}
                    </p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.importantInfo.billing.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">{{ t('tosView.importantInfo.billing.vatInvoices.title') }}</h4>
                    <p class="text-white text-lg">{{ t('tosView.importantInfo.billing.vatInvoices.content') }}</p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.importantInfo.refundPolicy.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <p class="text-white text-lg mb-3">
                        {{ t('tosView.importantInfo.refundPolicy.content') }}
                    </p>
                    <ul class="space-y-2 text-white text-lg">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>{{ t('tosView.importantInfo.refundPolicy.points.noRefunds') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>{{ t('tosView.importantInfo.refundPolicy.points.cancelAfterPayment') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>{{ t('tosView.importantInfo.refundPolicy.points.cancelBeforePayment') }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.importantInfo.warrantySupport.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">{{ t('tosView.importantInfo.warrantySupport.coverage.title') }}</h4>
                    <p class="text-white text-lg mb-3">
                        <strong>{{ t('tosView.importantInfo.warrantySupport.coverage.myCode') }}</strong>
                    </p>
                    <p class="text-white text-lg mb-3">
                        {{ t('tosView.importantInfo.warrantySupport.coverage.period') }}
                    </p>
                    <p class="text-white text-lg mb-3">
                        {{ t('tosView.importantInfo.warrantySupport.coverage.details') }}
                    </p>

                    <h4 class="text-lg font-medium text-blue-400 mt-4 mb-2">{{ t('tosView.importantInfo.warrantySupport.support.title') }}</h4>
                    <p class="text-white text-lg mb-3">
                        {{ t('tosView.importantInfo.warrantySupport.support.websiteIssues') }}
                    </p>
                    <p class="text-white text-lg mb-3">
                        {{ t('tosView.importantInfo.warrantySupport.support.thirdPartyIssues') }}
                    </p>

                    <h4 class="text-lg font-medium text-blue-400 mt-4 mb-2">{{ t('tosView.importantInfo.warrantySupport.changes.title') }}</h4>
                    <p class="text-white text-lg">
                        {{ t('tosView.importantInfo.warrantySupport.changes.content') }}
                    </p>
                </div>
            </div>
        </Tile>

        <!-- Payment and Services -->
        <Tile :title="t('tosView.paymentServices.title')" class="mb-8">
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.paymentServices.paymentInfo.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <p class="text-white text-lg mb-3">{{ t('tosView.paymentServices.paymentInfo.supportedServices') }}</p>
                    <ul class="space-y-2 text-white text-lg mb-3">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>{{ t('tosView.paymentServices.paymentInfo.services.paypal') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>{{ t('tosView.paymentServices.paymentInfo.services.wise') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">•</span>
                            <span>{{ t('tosView.paymentServices.paymentInfo.services.revolut') }}</span>
                        </li>
                    </ul>
                    <p class="text-white text-lg mb-3">{{ t('tosView.paymentServices.paymentInfo.currencies') }}</p>
                    <p class="text-white text-lg italic">
                        {{ t('tosView.paymentServices.paymentInfo.disclaimer') }}
                    </p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.paymentServices.thirdParty.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-blue-400 mb-2">{{ t('tosView.paymentServices.thirdParty.firebase.title') }}</h4>
                    <p class="text-white text-lg mb-3">
                        {{ t('tosView.paymentServices.thirdParty.firebase.usage') }}
                    </p>
                    <p class="text-white text-lg mb-3">
                        {{ t('tosView.paymentServices.thirdParty.firebase.tos') }} 
                        <a class="font-semibold text-blue-600 hover:text-blue-500" href="https://firebase.google.com/terms">{{ t('tosView.paymentServices.thirdParty.firebase.tosLink') }}</a>
                    </p>
                    <p class="text-white text-lg">
                        {{ t('tosView.paymentServices.thirdParty.firebase.resources') }}
                    </p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.paymentServices.orderProcess.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-6">
                    <ol class="space-y-3 text-white text-lg">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">1.</span>
                            <span>{{ t('tosView.paymentServices.orderProcess.steps.step1') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">2.</span>
                            <span>{{ t('tosView.paymentServices.orderProcess.steps.step2') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">3.</span>
                            <span>{{ t('tosView.paymentServices.orderProcess.steps.step3') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">4.</span>
                            <span>{{ t('tosView.paymentServices.orderProcess.steps.step4') }}</span>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2">5.</span>
                            <span>{{ t('tosView.paymentServices.orderProcess.steps.step5') }}</span>
                        </li>
                    </ol>

                    <p class="text-white text-lg mt-4 font-semibold text-red-400">
                        {{ t('tosView.paymentServices.orderProcess.changeWarning') }}
                    </p>

                    <p class="text-white text-lg mt-4">
                        {{ t('tosView.paymentServices.orderProcess.hostingNote') }}
                    </p>
                </div>
            </div>
        </Tile>

        <!-- Data Security -->
        <Tile :title="t('tosView.dataSecurity.title')">
            <div class="bg-gray-700 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-blue-500 mb-3">{{ t('tosView.dataSecurity.personalData.title') }}</h3>
                <p class="text-white text-lg mb-4">
                    {{ t('tosView.dataSecurity.personalData.content') }}
                </p>
                <p class="text-white text-lg">
                    {{ t('tosView.dataSecurity.personalData.moreInfo') }} 
                    <a class="font-semibold text-blue-600 hover:text-blue-500" href="/privacy-policy/">{{ t('tosView.dataSecurity.personalData.privacyPolicy') }}</a>.
                </p>
            </div>
        </Tile>
    </div>
</template>
