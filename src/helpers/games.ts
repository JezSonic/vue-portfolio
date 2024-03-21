interface GameData {
    [key: string]: {
        images: string[];
        downloadUrls: { win_64: string; x11_64: string; macos: string };
        description: string;
        shortDescription: string;
        title: string;
        copyright: string;
        made_with: string;
        authors: string;
    }
}

import fa1 from '@/assets/img/games/foxy-adventure/bg.webp'
import fa2 from '@/assets/img/games/foxy-adventure/img10.webp'
import fa3 from '@/assets/img/games/foxy-adventure/img11.webp'
import fa4 from '@/assets/img/games/foxy-adventure/img12.webp'
import fa5 from '@/assets/img/games/foxy-adventure/img13.webp'
import fa6 from '@/assets/img/games/foxy-adventure/img14.webp'
import fa7 from '@/assets/img/games/foxy-adventure/img15.webp'
import fa8 from '@/assets/img/games/foxy-adventure/credits.webp'
import fa9 from '@/assets/img/games/foxy-adventure/dene_bg.webp'
import fa10 from '@/assets/img/games/foxy-adventure/menu.webp'
import fa11 from '@/assets/img/games/foxy-adventure/new_ui_1.webp'
import fa12 from '@/assets/img/games/foxy-adventure/new_ui_2.webp'

import fp1 from '@/assets/img/games/furry-potato/img1.webp'
import fp2 from '@/assets/img/games/furry-potato/img2.webp'
import fp3 from '@/assets/img/games/furry-potato/img3.webp'
import fp4 from '@/assets/img/games/furry-potato/img4.webp'

import pz1 from '@/assets/img/games/pixelzone/pixel-zone-1.webp'
import pz2 from '@/assets/img/games/pixelzone/pixel-zone-2.webp'
import pz3 from '@/assets/img/games/pixelzone/pixel-zone-3.webp'
import pz4 from '@/assets/img/games/pixelzone/pixel-zone-4.webp'
import pz5 from '@/assets/img/games/pixelzone/pixel-zone-5.webp'
import pz6 from '@/assets/img/games/pixelzone/pixel-zone-6.webp'
import pz7 from '@/assets/img/games/pixelzone/pixel-zone-7.webp'
import pz8 from '@/assets/img/games/pixelzone/pixel-zone-8.webp'
import pz9 from '@/assets/img/games/pixelzone/pixel-zone-9.webp'

import sdd1 from '@/assets/img/games/super-duper-disco/super-duper-disco-1.webp'
import sdd2 from '@/assets/img/games/super-duper-disco/super-duper-disco-2.webp'
import sdd3 from '@/assets/img/games/super-duper-disco/super-duper-disco-3.webp'

const gameData: GameData = {
    'foxy-adventure': {
        title: 'Foxy Adventure',
        description: '2D platform game with New The Fox and Miles "Tails" Prower as a playable characters',
        shortDescription: '2D platform game with New The Fox and Miles "Tails" Prower as a playable characters',
        images: [fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, fa10, fa11, fa12],
        downloadUrls: {
            win_64: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/FoxyAdventure-windows-x64-installer.exe   ',
            macos: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/FoxyAdventure.zip',
            x11_64: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/FoxyAdventure-linux-x64-installer.run',
        },
        copyright: 'Copyright 2020 - ' + new Date().getFullYear() +  ' New DEV. All rights reserved',
        made_with: 'Godot Engine',
        authors: 'NewTheFox, DoS, GeKaGD'
    },
    'pixel-zone': {
        title: 'Pixel Zone',
        description: 'Go with Robi on his adventure!\n' +
            'Defeat all of the enemies, visit places, beautiful views and much more!\n' +
            'Your goal is to help Robi to get out of this place... Are You into this?\n' +
            'Go and help him! He needs a hero just like You!',
        shortDescription: 'Go with Robi on his adventure!',
        images: [pz1, pz2, pz3, pz4, pz5, pz6, pz7, pz8, pz9],
        downloadUrls: {
            win_64: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/PixelZone-windows-x64-installer.exe',
            macos: 'none',
            x11_64: 'none',
        },
        copyright: 'Copyright 2020 - ' + new Date().getFullYear() +  ' New DEV. All rights reserved',
        made_with: 'Godot Engine',
        authors: 'DoS'
    },
    'furry-potato': {
        title: 'Furry Potato',
        description: 'Short DJ Visual novel made for Godocikowy Dżem #5.\n' +
            '\nYou are an DJ... on the beginning of Your career.\n' +
            'Your way to earn money is: Play as DJ in Night clubs and earn money.\n' +
            'The better You are - the better equipment You can afford yourself and the more You earn, got it?',
        shortDescription: 'You are an DJ... on the beginning of Your career.',
        images: [fp1, fp2, fp3, fp4],
        downloadUrls: {
            win_64: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/FurryPotato-windows-x64-installer.exe',
            macos: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/FurryPotato.zip',
            x11_64: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/FurryPotato-linux-x64-installer.run',
        },
        copyright: 'Copyright 2020 - ' + new Date().getFullYear() +  ' New DEV. All rights reserved',
        made_with: 'Godot Engine',
        authors: 'DoS'
    },
    'super-duper-disco': {
        title: 'Super Duper Disco',
        description: 'Short multiplayer game novel made for Godocikowy Dżem #4.\n' +
            'It\'s all about pressing keys in the rhythm of the song. Nothing hard, huh?\n' +
            'Try and ask again then 😏',
        shortDescription: 'It\'s all about pressing keys in the rhythm of the song. Nothing hard, huh?\n',
        images: [sdd1, sdd2, sdd3],
        downloadUrls: {
            win_64: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/SuperDuperDisco-windows-x64-installer.exe',
            macos: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/SuperDuperDisco.zip',
            x11_64: 'https://github.com/NewDEV-github/new-dev-dl/releases/download/static/SuperDuperDisco-linux-x64-installer.run',
        },
        copyright: 'Copyright 2020 - ' + new Date().getFullYear() +  ' New DEV. All rights reserved',
        made_with: 'Godot Engine',
        authors: 'DoS'
    }
}
export enum DownloadPlatforms {
    Windows = 'win_64',
    MacOS = 'macos',
    Linux = 'x11_64'
}
export default gameData