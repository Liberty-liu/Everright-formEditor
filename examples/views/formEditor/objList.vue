<script setup>
import { ref, onMounted, getCurrentInstance, reactive, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
import uri from '@ER-examples/uri.js'
const router = useRouter()
const loading = ref(true)
const oldData = ref({})
const centerDialogVisible = ref(false)
const options = ref([])
const ruleFormRef = ref()
const rules = reactive({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'blur' }
  ]
})
const ruleForm = reactive({
  name: ''
})
const isCollapse = ref(false)
const isEdit = computed(() => !_.isEmpty(oldData.value))
const getAllobjs = async () => {
  loading.value = true
  try {
    const {
      data
    } = await hooks.useFetch(`${uri.obj}`, {
      method: 'get'
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
const changeName = (data) => {
  centerDialogVisible.value = true
  oldData.value = data
  ruleForm.name = data.name
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
const handleEvent = async (type) => {
  if (type === 2) {
    loading.value = true
    try {
      const data = {
        name: ruleForm.name,
        content: isEdit.value ? oldData.value.content : {}
      }
      if (isEdit.value) {
        const {
          data: {
            id
          }
        } = await hooks.useFetch(`${uri.obj}/${oldData.value.id}`, {
          method: 'put',
          data
        })
        getAllobjs()
      } else {
        const {
          data: {
            id
          }
        } = await hooks.useFetch(`${uri.obj}`, {
          method: 'post',
          data
        })
        router.push({
          name: 'objEdit',
          params: {
            objid: id
          }
        })
      }
    } finally {
      loading.value = false
    }
  }
  centerDialogVisible.value = false
  oldData.value = {}
  nextTick(() => {
    ruleFormRef.value.resetFields()
  })
}
onMounted(() => {
  getAllobjs()
})
</script>
<template>
  <div>
    <div>
      <el-button type="primary" @click="centerDialogVisible = true">Create</el-button>
    </div>
    <el-table v-loading="loading" :data="options" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180">
        <template #default="scope">
          <el-popover
            :width="250"
            trigger="hover"
          >
            <el-button @click="() => changeName(scope.row)">Click Me to change the name</el-button
            >
            <template #reference>
              <span>{{ scope.row.name }}</span>
<!--              <router-link :to="{ name: 'dataList', params: { objid: scope.row.id}}">{{ scope.row.name }}</router-link>-->
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="create_timestamp" label="Create time" />
      <el-table-column prop="update_timestamp" label="Update time" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-row align="middle">
            <el-col :span="10">
              <router-link :to="{ name: 'objEdit', params: { objid: scope.row.id}}">Edit</router-link>
            </el-col>
            <el-col :span="10">
              <el-button @click="() => handleDel(scope.row.id)" link type="primary">Delete</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="centerDialogVisible"
    :title="`${isEdit ? 'Edit' : 'New' }object`"
    width="30%"
    align-center
  >
    <el-form
      @submit.prevent
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules">
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => handleEvent(1)">Cancel</el-button>
        <el-button type="primary" @click="() => handleEvent(2)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
