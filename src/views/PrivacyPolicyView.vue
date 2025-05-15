<script lang="ts" setup>
import Tile from "@/components/tiles/Tile.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <!-- Header Section -->
        <div class="mb-6 sm:mb-8 text-center">
            <h1 class="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{{ t('privacyPolicy.title') }}</h1>
            <p class="text-gray-400">{{ t('privacyPolicy.lastUpdated') }}</p>
        </div>

        <!-- Introduction -->
        <Tile :title="t('privacyPolicy.introduction.title')" class="mb-6 sm:mb-8">
            <p class="text-white text-base sm:text-lg mb-3 sm:mb-4">
                {{ t('privacyPolicy.introduction.paragraph1') }}
            </p>
            <p class="text-white text-base sm:text-lg">
                {{ t('privacyPolicy.introduction.paragraph2') }}
            </p>
        </Tile>

        <!-- Interpretation and Definitions -->
        <Tile :title="t('privacyPolicy.interpretationDefinitions.title')" class="mb-6 sm:mb-8">
            <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.interpretationDefinitions.interpretation.title') }}</h3>
            <p class="text-white text-base sm:text-lg mb-4 sm:mb-6">
                {{ t('privacyPolicy.interpretationDefinitions.interpretation.content') }}
            </p>

            <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.interpretationDefinitions.definitions.title') }}</h3>
            <p class="text-white text-base sm:text-lg mb-3 sm:mb-4">{{ t('privacyPolicy.interpretationDefinitions.definitions.intro') }}</p>

            <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                <ul class="space-y-4">
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.account') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.accountDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.company') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.companyDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.cookies') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.cookiesDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.country') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.countryDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.device') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.deviceDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.personalData') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.personalDataDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.service') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.serviceDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.serviceProvider') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.serviceProviderDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.thirdPartySocialMedia') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.thirdPartySocialMediaDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.usageData') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.usageDataDesc') }}</span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.website') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.websiteDesc') }} 
                            <a class="font-semibold text-blue-600 hover:text-blue-500" href="https://newdev.web.app/">https://newdev.web.app/</a> and 
                            <a class="font-semibold text-blue-600 hover:text-blue-500" href="https://newdev.pl/">https://newdev.pl/</a>
                        </span>
                    </li>
                    <li class="flex flex-col sm:flex-row">
                        <span class="font-bold text-blue-400 mb-1 sm:mb-0 sm:mr-2 sm:min-w-[160px] sm:max-w-[160px]">{{ t('privacyPolicy.interpretationDefinitions.definitions.you') }}:</span>
                        <span class="text-white">{{ t('privacyPolicy.interpretationDefinitions.definitions.youDesc') }}</span>
                    </li>
                </ul>
            </div>
        </Tile>
        <!-- Personal Data Collection -->
        <Tile :title="t('privacyPolicy.personalData.title')" class="mb-6 sm:mb-8">
            <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.personalData.typesCollected.title') }}</h3>

            <div class="mb-4 sm:mb-6">
                <h4 class="text-base sm:text-lg font-medium text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.personalData.typesCollected.personalData.title') }}</h4>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.personalData.content') }}
                </p>
                <ul class="list-disc pl-6 text-white space-y-1">
                    <li>{{ t('privacyPolicy.personalData.typesCollected.personalData.item1') }}</li>
                    <li>{{ t('privacyPolicy.personalData.typesCollected.personalData.item2') }}</li>
                </ul>
            </div>

            <div class="mb-4 sm:mb-6">
                <h4 class="text-base sm:text-lg font-medium text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.personalData.typesCollected.usageData.title') }}</h4>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.usageData.paragraph1') }}
                </p>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.usageData.paragraph2') }}
                </p>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.usageData.paragraph3') }}
                </p>
                <p class="text-white text-base sm:text-lg">
                    {{ t('privacyPolicy.personalData.typesCollected.usageData.paragraph4') }}
                </p>
            </div>

            <div class="mb-4 sm:mb-6">
                <h4 class="text-base sm:text-lg font-medium text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.title') }}</h4>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.paragraph1') }}
                </p>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.paragraph2') }}
                </p>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.paragraph3') }}
                    <a class="font-semibold text-blue-600 hover:text-blue-500" href="https://www.termsfeed.com/blog/cookies/" rel="noopener noreferrer" target="_blank">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.cookiesLink') }}</a>.
                </p>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.paragraph4') }}
                </p>

                <div class="bg-gray-700 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div>
                        <h5 class="font-bold text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.necessaryCookies.title') }}</h5>
                        <p class="text-white mb-1"><span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.necessaryCookies.type') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.necessaryCookies.typeValue') }}</p>
                        <p class="text-white mb-1"><span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.necessaryCookies.administeredBy') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.necessaryCookies.administeredByValue') }}</p>
                        <p class="text-white">
                            <span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.necessaryCookies.purpose') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.necessaryCookies.purposeValue') }}
                        </p>
                    </div>

                    <div>
                        <h5 class="font-bold text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.acceptanceCookies.title') }}</h5>
                        <p class="text-white mb-1"><span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.acceptanceCookies.type') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.acceptanceCookies.typeValue') }}</p>
                        <p class="text-white"><span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.acceptanceCookies.administeredBy') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.acceptanceCookies.administeredByValue') }}</p>
                    </div>

                    <div>
                        <h5 class="font-bold text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.functionalityCookies.title') }}</h5>
                        <p class="text-white mb-1"><span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.functionalityCookies.type') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.functionalityCookies.typeValue') }}</p>
                        <p class="text-white mb-1"><span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.functionalityCookies.administeredBy') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.functionalityCookies.administeredByValue') }}</p>
                        <p class="text-white">
                            <span class="text-gray-400">{{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.functionalityCookies.purpose') }}</span> {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.functionalityCookies.purposeValue') }}
                        </p>
                    </div>
                </div>

                <p class="text-white text-base sm:text-lg mt-3 sm:mt-4">
                    {{ t('privacyPolicy.personalData.typesCollected.trackingTechnologies.moreInfo') }}
                </p>
            </div>

            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.personalData.useOfPersonalData.title') }}</h3>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.personalData.useOfPersonalData.intro') }}
                </p>

                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <ul class="space-y-4 text-white">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.purposes.provideService.title') }}</span>, {{ t('privacyPolicy.personalData.useOfPersonalData.purposes.provideService.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.purposes.manageAccount.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.purposes.manageAccount.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.purposes.performContract.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.purposes.performContract.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.purposes.contactYou.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.purposes.contactYou.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.purposes.provideOffers.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.purposes.provideOffers.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.purposes.manageRequests.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.purposes.manageRequests.description') }}
                            </div>
                        </li>
                    </ul>
                </div>

                <p class="text-white text-lg mt-4 mb-3">
                    {{ t('privacyPolicy.personalData.useOfPersonalData.sharingInfo') }}
                </p>

                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <ul class="space-y-4 text-white">
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.serviceProviders.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.serviceProviders.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.businessTransfers.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.businessTransfers.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.affiliates.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.affiliates.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.businessPartners.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.businessPartners.description') }}
                            </div>
                        </li>
                        <li class="flex">
                            <span class="font-bold text-blue-400 mr-2 mt-0.5">•</span>
                            <div>
                                <span class="font-semibold">{{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.otherUsers.title') }}</span> {{ t('privacyPolicy.personalData.useOfPersonalData.sharingScenarios.otherUsers.description') }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Tile>
        <!-- Data Retention and Transfer -->
        <Tile :title="t('privacyPolicy.dataManagement.title')" class="mb-6 sm:mb-8">
            <div class="mb-4 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.dataManagement.retention.title') }}</h3>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.dataManagement.retention.paragraph1') }}
                </p>
                <p class="text-white text-base sm:text-lg">
                    {{ t('privacyPolicy.dataManagement.retention.paragraph2') }}
                </p>
            </div>

            <div class="mb-4 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.dataManagement.transfer.title') }}</h3>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.dataManagement.transfer.paragraph1') }}
                </p>
                <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                    {{ t('privacyPolicy.dataManagement.transfer.paragraph2') }}
                </p>
                <p class="text-white text-base sm:text-lg">
                    {{ t('privacyPolicy.dataManagement.transfer.paragraph3') }}
                </p>
            </div>

            <div class="mb-4 sm:mb-8">
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.dataManagement.disclosure.title') }}</h3>

                <div class="bg-gray-700 rounded-lg p-4 sm:p-6 mb-3 sm:mb-4">
                    <h4 class="text-base sm:text-lg font-medium text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.dataManagement.disclosure.businessTransactions.title') }}</h4>
                    <p class="text-white text-base sm:text-lg">
                        {{ t('privacyPolicy.dataManagement.disclosure.businessTransactions.content') }}
                    </p>
                </div>

                <div class="bg-gray-700 rounded-lg p-4 sm:p-6 mb-3 sm:mb-4">
                    <h4 class="text-base sm:text-lg font-medium text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.dataManagement.disclosure.lawEnforcement.title') }}</h4>
                    <p class="text-white text-base sm:text-lg">
                        {{ t('privacyPolicy.dataManagement.disclosure.lawEnforcement.content') }}
                    </p>
                </div>

                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <h4 class="text-base sm:text-lg font-medium text-blue-400 mb-1 sm:mb-2">{{ t('privacyPolicy.dataManagement.disclosure.otherLegalRequirements.title') }}</h4>
                    <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                        {{ t('privacyPolicy.dataManagement.disclosure.otherLegalRequirements.intro') }}
                    </p>
                    <ul class="list-disc pl-6 text-white space-y-1">
                        <li>{{ t('privacyPolicy.dataManagement.disclosure.otherLegalRequirements.item1') }}</li>
                        <li>{{ t('privacyPolicy.dataManagement.disclosure.otherLegalRequirements.item2') }}</li>
                        <li>{{ t('privacyPolicy.dataManagement.disclosure.otherLegalRequirements.item3') }}</li>
                        <li>{{ t('privacyPolicy.dataManagement.disclosure.otherLegalRequirements.item4') }}</li>
                        <li>{{ t('privacyPolicy.dataManagement.disclosure.otherLegalRequirements.item5') }}</li>
                    </ul>
                </div>
            </div>

            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.dataManagement.security.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <p class="text-white text-base sm:text-lg">
                        {{ t('privacyPolicy.dataManagement.security.content') }}
                    </p>
                </div>
            </div>
        </Tile>
        <!-- California Privacy Rights -->
        <Tile :title="t('privacyPolicy.californiaRights.title')" class="mb-6 sm:mb-8">
            <div class="mb-4 sm:mb-6">
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.californiaRights.shineTheLight.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                        {{ t('privacyPolicy.californiaRights.shineTheLight.paragraph1') }}
                    </p>
                    <p class="text-white text-base sm:text-lg">
                        {{ t('privacyPolicy.californiaRights.shineTheLight.paragraph2') }}
                    </p>
                </div>
            </div>

            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.californiaRights.minorUsers.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                        {{ t('privacyPolicy.californiaRights.minorUsers.paragraph1') }}
                    </p>
                    <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                        {{ t('privacyPolicy.californiaRights.minorUsers.paragraph2') }}
                    </p>
                    <p class="text-white text-base sm:text-lg">
                        {{ t('privacyPolicy.californiaRights.minorUsers.paragraph3') }}
                    </p>
                </div>
            </div>
        </Tile>

        <!-- Additional Information -->
        <Tile :title="t('privacyPolicy.additionalInfo.title')" class="mb-6 sm:mb-8">
            <div class="mb-4 sm:mb-6">
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.additionalInfo.otherWebsites.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                        {{ t('privacyPolicy.additionalInfo.otherWebsites.paragraph1') }}
                    </p>
                    <p class="text-white text-base sm:text-lg">
                        {{ t('privacyPolicy.additionalInfo.otherWebsites.paragraph2') }}
                    </p>
                </div>
            </div>

            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-blue-500 mb-2 sm:mb-3">{{ t('privacyPolicy.additionalInfo.changes.title') }}</h3>
                <div class="bg-gray-700 rounded-lg p-4 sm:p-6">
                    <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                        {{ t('privacyPolicy.additionalInfo.changes.paragraph1') }}
                    </p>
                    <p class="text-white text-base sm:text-lg mb-2 sm:mb-3">
                        {{ t('privacyPolicy.additionalInfo.changes.paragraph2') }}
                    </p>
                    <p class="text-white text-base sm:text-lg">
                        {{ t('privacyPolicy.additionalInfo.changes.paragraph3') }}
                    </p>
                </div>
            </div>
        </Tile>

        <!-- Contact Section -->
        <Tile :title="t('privacyPolicy.contact.title')">
            <p class="text-white text-base sm:text-lg mb-3 sm:mb-4">
                {{ t('privacyPolicy.contact.intro') }}
            </p>
            <div class="bg-gray-700 rounded-lg p-4 sm:p-6 inline-block">
                <p class="text-white flex items-center">
                    <span class="text-blue-400 mr-2">•</span>
                    {{ t('privacyPolicy.contact.byVisiting') }} <a class="font-semibold text-blue-600 hover:text-blue-500 ml-1" href="/contact">{{ t('privacyPolicy.contact.contactPage') }}</a>&nbsp;{{ t('privacyPolicy.contact.onWebsite') }}
                </p>
            </div>
        </Tile>
    </div>
</template>
