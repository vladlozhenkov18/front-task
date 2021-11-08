<template>
    <div class='arrow' :class="[isActive ? 'down' : 'up']">
    </div>
</template>

<script>
export default {
    name: 'Arrow',
    props: {
        isActive: Boolean
    }
}
</script>

<style scoped lang="scss">
    .arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        width: 2px;
        height: 2px;
        padding: 3px;
        transition: 0.5s;
    }

    .down {
        transform: rotate(45deg);
    }

    .up {
        transform: rotate(-135deg);
    }
</style>
