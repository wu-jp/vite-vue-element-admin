<template>
  <el-main>
    <router-view />
    <!--        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>-->
  </el-main>
</template>

<script setup></script>

<style scoped></style>
