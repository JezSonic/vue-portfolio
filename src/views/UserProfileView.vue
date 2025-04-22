<script lang="ts" setup>
    import { ref } from "vue";
    import UserService from "@/services/userService.ts";
    import { useUserStore } from "@/stores/userStore.ts";
    import router from "@/router";
    import { IUserData } from "@/types/user.d";
    import Loading from "@/components/ui/Loading.vue";

    const userStore = useUserStore();
    if (userStore.id == null) {
        router.push("/auth");
    }

    const notConnectedAccounts = ref<string[]>([]);

    const userData = ref<IUserData | null>(null);
    UserService.getUser()
        .then((data) => {
            userData.value = data;
        });

    const timestampToDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
    };
</script>

<template>
    <div>
        <h1>
            {{userData ? 'Your user profile' : 'Loading...'}}
        </h1>
        <Loading v-if="!userData" :loading="true"/>
        <div v-if="userData">
            <p><strong>Name: </strong> {{ userData.name }}</p>
            <p><strong>Email: </strong> {{ userData.email }}</p>
            <p><strong>Created at: </strong> {{ timestampToDate(userData.created_at) }}</p>
            <p><strong>Last updated at: </strong> {{ timestampToDate(userData.updated_at) }}</p>
        </div>

<!--        @TODO: Add ability to connect social accounts to existing account from the profile-->
<!--        @TODO: Add ability to add password login to only social account-->
<!--        @TODO: Add password change options-->

        <p class="info" v-if="userData?.google || userData?.github"><strong><i>Information from connected social accounts might be outdated</i></strong></p>
        <div v-if="userData?.google">
            <h2>Connected Google account:</h2>
            <p v-if="userData.google.name"><strong>Name: </strong> {{ userData.google.name }}</p>
            <p><strong>Email: </strong> {{ userData.google.email }}</p>
            <p v-if="userData.google.nickname"><strong>Nickname: </strong> {{ userData.google.nickname }}</p>
            <p><strong>Avatar:</strong></p>
            <img v-if="userData.google.avatar_url" :src="userData.google.avatar_url" alt="Google Account avatar" />
        </div>
        <div v-if="userData?.github">
            <h2>Connected GitHub account: </h2>
            <p v-if="userData.github.login"><strong>Login: </strong> {{ userData.github.login }}</p>
            <p v-if="userData.github.name"><strong>Name: </strong> {{ userData.github.name }}</p>
            <p v-if="userData.github.email"><strong>Email: </strong> {{ userData.github.email }}</p>
            <p v-if="userData.github.bio"><strong>Bio: </strong> {{ userData.github.bio }}</p>
            <p v-if="userData.github.company"><strong>Company: </strong> {{ userData.github.company }}</p>
            <p v-if="userData.github.website"><strong>Website: </strong> {{ userData.github.website }}</p>
            <p v-if="userData.github.blog"><strong>Blog: </strong> <a :href="userData.github.blog"> {{userData.github.blog}} </a></p>
            <p v-if="userData.github.location"><strong>Location: </strong> {{ userData.github.location }}</p>
            <p><strong>Avatar:</strong></p>
            <img v-if="userData.github.avatar_url" :src="userData.github.avatar_url" alt="GitHub Account avatar" />
            <p><strong>Profile url:</strong> <a :href="userData.github.html_url"
                                                target="_blank">{{ userData.github.html_url }}</a></p>
            <p v-if="userData.github.public_repos"><strong>Public repositories: </strong> {{ userData.github.public_repos }}</p>
            <p v-if="userData.github.public_gists"><strong>Public gists: </strong> {{ userData.github.public_gists }}</p>
            <p v-if="userData.github.followers"><strong>Followers: </strong> {{ userData.github.followers }}</p>
            <p v-if="userData.github.following"><strong>Following: </strong> {{ userData.github.following }}</p>

        </div>
    </div>
</template>

<style lang="scss" scoped>
    .info {
        padding-top: 16px;
    }

    img {
        width: 128px;
        height: 128px;
        aspect-ratio: 1/1;
    }
</style>