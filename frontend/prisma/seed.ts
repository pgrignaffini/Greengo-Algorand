import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.project.upsert({
        create: {
            id: 'cl8x65vcy0000s5f0j5hq9jge',
            name: 'Eden Project',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmNVVdeqBfpDx7mSu6XNBv2Cvc4BVHVh5sdLSKjNbgNkX7',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmNTTupyLfqpKDbUZfJNGXWaCkuhruTB4ZpAAgL3yFwf95',
            description: 'The Eden Project is attraction situated in Cornwall and it is the largest rainforest in captivity. Complex is dominated by two enormous enclosures which are home for many plants collected from all around the world. The Eden Project opened on the 17th March 2001. and its name originate form the 1994 TV series Earth 2. Eden is a place where each person can explore its dependence on the nature and take inspiration on how to preserve the environment and make the Earth a better place to live.',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@edenproject',
            website: 'https://www.edenproject.com/',
            end: '2022-11-06T16:43',
            goal: '1000',
            start: '2022-10-06T16:43',
        },
        where: {
            id: 'cl8x65vcy0000s5f0j5hq9jge'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x6guwk0005s5f0qo0p4oq1',
            name: 'Chatham Green Project ',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmQMCuqqJhJ7v45GpuAqKbYhGYP1ay3DyzGc4pwHwghnKJ',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmUyfMzsrfp92nDGdedz5iZ3uivVL4nLcrMjvn1tFCaFDm',
            description: 'The Chatham Green Project is both conservation and education initiative focused on sustainable use of land. The projects aims to explore the most effective ways of utilising land for the needs of farming and nature in the 21st century. Some of the key features of the Chatham Green Project include planting of more than 12, 000 trees, restoration of a wildflowers meadow and education program aimed to educate over 2,000 schools each year.',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@WildernessUK',
            website: 'www.wildernessfoundation.org.uk',
            end: '2022-10-29T16:49',
            goal: '150',
            start: '2022-10-06T16:49',
        },
        where: {
            id: 'cl8x6guwk0005s5f0qo0p4oq1'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x6p2rr0007s5f0k3bhka77',
            name: 'Beyond skin ',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmZEpTGNv7H13XVx5iuJA8kywbgm72NuiX55h6uSqbpYxR',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmbN7guKBUvFP7Zp1pEeh6UbLwp5gD3JVoyHb8Me6UeNNX',
            description: 'Beyond Skin is Ethical Footwear and fashion label that creates handmade and 100% vegan and environmentally friendly ladies shoes. Idea behind the brand is to bring  style and quality to those that care. All the shoes are made of the finest recycled leather free fabric in collaboration with suppliers that reduce the carbon footprint whenever it is possible. We are challenging the preconception of ethical fashion. It\'s a great driver for the team at Beyond Skin, and we thrive off the philosophy of the brand! - Heather Whittle',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@BeyondSkinTweet',
            website: 'www.beyondskin.co.uk',
            end: '2022-11-04T16:58',
            goal: '200',
            start: '2022-10-14T16:58',
        },
        where: {
            id: 'cl8x6p2rr0007s5f0k3bhka77'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x6tgdm0008s5f0lloxsi7f',
            name: 'Style with Heart ',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmR9eDENseo3BRWf5ioMiiv639UwoBXKUdtYnbTDEVF9m1',
            banner: '',
            description: 'Style With Heart is a website created to promote eco-ethical fashion brands that are really trying to make a difference.  The blog and magazine were included to educate visitors to the site and also inspire and get them thinking about the clothes they wear.I have worked in the world of ‘fashion’ for the past 20 years and began meeting people who set up clothing companies with the aim of helping people in their supply chain and minimising their impact on the environment. - Gillian Osrin',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@StyleWithHeart',
            website: 'www.stylewithheart.com',
            end: '2022-10-20T17:02',
            goal: '50',
            start: '2022-10-06T17:02',
        },
        where: {
            id: 'cl8x6tgdm0008s5f0lloxsi7f'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x65vcy0000s5f0j5hq9jge',
            name: 'Greenhost',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmWmAWxRK6dELCQVqbLZyc1ciLprnzPP1ZLwNjft4TGKMq',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmRV53FRYNQJ6f7GVibDmgtvaeejAVhSu1pK5ATBsq1k81',
            description: 'Greenhost is energy efficient webhosting platform that offers fresh approach to sustainability and supports projects in the field of education, journalism and culture. Greenhost strive towards paper-free office and business trips in electric vehicles.We are nerds. We love technology. But there is very little fun in keeping thousands of machines up and running 24/7 if you know that you are burning the planet at the same time. We satisfied every nerds dream by pushing the limits of machine optimisation and got a green platform in due course. - Douwe Schmidt',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@greenhost',
            website: 'https://www.greenhost.net/',
            end: '2022-10-29T17:06',
            goal: '1000',
            start: '2022-10-06T17:05',
        },
        where: {
            id: 'cl8x65vcy0000s5f0j5hq9jge'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x721wb000cs5f0z5tkfz3z',
            name: 'Claire Potter Design',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmVNrJf3tE9LLesrMHX99j2pwWkgytmrF9yfX3ezQvrQM7',
            banner: 'https://greengo.infura-ipfs.io/ipfs/Qmb6b9MdEsXhjdau9XMfgLAdfiLG9V6E4qdJT5hNyNRXNV',
            description: 'Claire Potter Design is Brighton based studio committed to producing innovative, exciting and sustainable interior and landscape design solutions.We strive to create projects that are not only innovative and beautiful, but are fully responsible with the materials and processes that we use. We design using reclaimed and repurposed pieces and love to show that ‘ethical’ design can also be high quality, contemporary and suitable for both commercial and private settings. As designers, we have a huge responsibility for the projects we create and we try to make a big visual impact with a little environmental impact.- Claire Potter',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@ClairePotter',
            website: 'https://www.clairepotterdesign.com/',
            end: '2022-11-14T17:08',
            goal: '100',
            start: '2022-10-15T17:08',
        },
        where: {
            id: 'cl8x721wb000cs5f0z5tkfz3z'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x746li000es5f0isu0a9xy',
            name: 'Dancing Rabbit Ecovillage ',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmfX8o4He3hu1oHSPaidsna7BiMjXyBUA4xGfjR8gdi2RX',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmPTLpK94S9aZFnPHyUCPFBN8EVGUkAFAEBBaVtkeLQtd8',
            description: 'Dancing Rabbit is a community with the goal of growing and being a self-reliant town with residents committed to radical environmental sustainability. This ecovillage strives for self-sufficiency and economic independence with the integral goals such as outreach and education.At Dancing Rabbit Ecovillage, we are showing that human beings can live joyful, thriving, connected lives using only 10% of the resources of the modern Westerner. We believe that community is the secret ingredient in sustainability, and a world that works for everyone. - Danielle for Dancing Rabbit Ecovillage',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@dancingrabbit',
            website: 'https:// www.dancingrabbit.org',
            end: '2022-11-05T17:10',
            goal: '5000',
            start: '2022-10-06T17:10',
        },
        where: {
            id: 'cl8x746li000es5f0isu0a9xy'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x775a1000fs5f0drdq4ra5',
            name: 'Green Alliance',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmT41ZFb2RAViHJvgmVut8Ku98mvvNpnT869fgv6YGynxV',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmTWywaAtKMFwkLZCbywF7FeWmHMiasAR8m7RNquut2W4y',
            description: 'Green Alliance is charity organisation focused on ambitious leadership for the environment. During the past decades organisation worked with a growing network, NGOs and politics in order to increase support, stimulate new way of thinking and dialogue on environmental policy. Their work include projects involved in deep research and advocacy by experts in the field. Green Alliance was lunched in 1970 with main aim of ensuring that political priorities of the UK are determined within an ecological perspective.',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@GreenAllianceUK',
            website: 'https:// www.green-alliance.org.uk',
            end: '2022-10-19T17:12',
            goal: '50000',
            start: '2022-10-08T17:12',
        },
        where: {
            id: 'cl8x775a1000fs5f0drdq4ra5'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl8x78mlf000hs5f0klruvh4n',
            name: 'Otesha Project',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmPMPJ4D5F2Rti8F7eP3HeBGstgPBvDP8znsCFujiJUM2i',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmRYN7DH72tNaMT4AAXWidJBNL8GMyWjTEjyVjX5ZNmCmc',
            description: 'Otesha is a community of people who see their lives as a powerful tool for environmental and social changes. Otesha is involved in day to day choices while at same time inspiring people tot ale positive and innovative action for cleaner and greener environment. Young people from various backgrounds are empowered by Otesha to lead in creating change for themselves, their community and the world. During the summer season members of Otesha organisation are hopping on bikes and travelling across the UK stopping along the way to inspire individuals and create positive action towards more sustainable future.',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@oteshaproject',
            website: 'www.otesha.org.uk',
            end: '2022-11-06T17:13',
            goal: '100',
            start: '2022-10-08T17:13',
        },
        where: {
            id: 'cl8x78mlf000hs5f0klruvh4n'
        },
        update: {}
    })
    await prisma.project.upsert({
        create: {
            id: 'cl96rairn0000s5mf45xqxi2e',
            name: 'EDF Energy',
            email: '',
            image: 'https://greengo.infura-ipfs.io/ipfs/QmePXpUTNkSUHQhowHvahzRrinWkHAZXbxrHu35xBn7WCg',
            banner: 'https://greengo.infura-ipfs.io/ipfs/QmSTJbyg5EwZ9kkgJyP2rPZ4cb3suJGWX8JzoRHS7eXwRK',
            description: 'We\'re delighted to be recognized by Green Match UK for our schools programme the Pod. Educating young people about energy, science and sustainability is very important to EDF Energy and we\'re really pleased to have reached 19,500 schools across the UK and in 36 countries across the world with our resources and green campaigns.\' - Robyn Thorn, Education Programme Manager.',
            creatorId: 'cl9cipdm50000s5z4uup5wlpy',
            twitter: '@edfenergy',
            website: 'jointhepod.org/home',
            end: '2022-11-04T09:45',
            goal: '1000',
            start: '2022-10-13T09:44',
        },
        where: {
            id: 'cl96rairn0000s5mf45xqxi2e'
        },
        update: {}
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })