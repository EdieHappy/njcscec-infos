<template>
    <div class="project-link">
        <div class="link-item">
            <div class="item-label">智慧工地</div>
            <div class="item-links">
                <div class="open-link" @click="openLink('http://106.14.40.49/pc/smartsite/login')">后台：http://106.14.40.49/pc/smartsite/login</div>
            </div>
        </div>
        <div class="link-item">
            <div class="item-label">流动红旗</div>
            <div class="item-links">
                <div class="open-link" @click="openLink('http://zjaznj.com/wap/njcscec/scorePage')">链接：http://zjaznj.com/wap/njcscec/scorePage</div>
            </div>
        </div>
        <div class="link-item">
            <div class="item-label">BIM证书下载</div>
            <div class="item-links">
                <div class="open-link" @click="openLink('http://zjaznj.com/pc/searchCer/front/login')">前台：http://zjaznj.com/pc/searchCer/front/login</div>
                <div class="open-link" @click="openLink('http://zjaznj.com/pc/searchCer/cms/login')">后台：http://zjaznj.com/pc/searchCer/cms/login</div>
            </div>
        </div>
        <div class="link-item">
            <div class="item-label">防控疫情信息收集</div>
            <div class="item-links">
                <div class="open-link" @click="openLink('http://zjaznj.com/m/njcscec/study/disease')">链接：http://zjaznj.com/m/njcscec/study/disease</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'projectLink',
    data() {
        return {

        }
    },
    methods: {
        openLink(url) {
            window.open(url)
        }
    }
}
</script>

<style lang="scss" scoped>
    .project-link{
        background: #fff;
        min-height: 100%;
        padding: rem(20);
        .link-item{
            margin-top: rem(20);
            .item-label{
                font-size: rem(14);
            }
            .item-links{
                .open-link{
                    font-size: rem(14);
                    color:blue;
                }
            }
        }
    }
</style>