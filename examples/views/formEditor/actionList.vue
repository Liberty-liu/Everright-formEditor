<script setup>
import { ref, onMounted, getCurrentInstance, reactive, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
import uri from '@ER-examples/uri.js'
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const oldData = ref({})
const options = ref([])
const ruleFormRef = ref()
const isCollapse = ref(false)
const isEdit = computed(() => !_.isEmpty(oldData.value))
const getAllActions = async () => {
  loading.value = true
  try {
    const {
      data
    } = await hooks.useFetch(`${uri.obj}/${route.params.objid}/action`, {
      method: 'post'
    })
    options.value = data.map(e => {
      e.create_timestamp = dayjs.unix(e.create_timestamp).format('YYYY/MM/DD - HH:mm:ss')
      e.update_timestamp = dayjs.unix(e.update_timestamp).format('YYYY/MM/DD - HH:mm:ss')
      return e
    })
  } finally {
    loading.value = false
  }
}
const handleDel = async (id) => {
  loading.value = true
  try {
    await hooks.useFetch(`${uri.obj}/${id}`, {
      method: 'delete'
    })
    getAllobjs()
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getAllActions()
})
</script>
<template>
  <div>
    <div>
      <el-button type="primary" @click="router.push({ name: 'actionEdit', params: { objid: route.params.objid }})">
        Create
      </el-button>
    </div>
    <el-table v-loading="loading" :data="options" style="width: 100%">
      <el-table-column prop="create_timestamp" label="Create time" />
      <el-table-column prop="update_timestamp" label="Update time" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-row align="middle">
            <el-col :span="10">
              <router-link :to="{ name: 'actionEdit', params: { objid: route.params.objid, actionid: scope.row.id }}">Edit</router-link>
            </el-col>
            <el-col :span="10">
              <el-button @click="() => handleDel(scope.row.id)" link type="primary">Delete</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
