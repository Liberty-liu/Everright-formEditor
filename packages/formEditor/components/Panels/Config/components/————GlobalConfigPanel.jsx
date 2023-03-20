import { defineComponent } from 'vue'
import DeviceSwitch from '@ER/formEditor/components/DeviceSwitch.vue'
import hooks from '@ER/hooks'
// <script>
// import dayjs from 'dayjs'
// import hooks from '@ER/hooks'
// import DeviceSwitch from '@ER/formEditor/components/DeviceSwitch.vue'
// export default {
//   name: 'GlobalConfigPanel',
//   inheritAttrs: false,
//   customOptions: {}
// }
// </script>
// <script setup>
// const {
//   target,
//   state,
//   isPc
// } = hooks.useTarget()
// const ns = hooks.useNamespace('GlobalConfigPanel')
// </script>
export default defineComponent({
  name: 'GlobalConfigPanel',
  components: {
    DeviceSwitch
  },
  setup () {
    const {
      target,
      state,
      isPc
    } = hooks.useTarget()
    return () => {
      return (
        <div>
          <DeviceSwitch justify-content="center"></DeviceSwitch>
          <el-form-item label="同步设置电脑和移动端" label-position="left">
            <el-switch v-model={target.value.isSync}/>
          </el-form-item>
          { isPc.value && (
            <el-form-item label="组件尺寸">
              <el-radio-group v-model={target.value[state.platform].size} size="large">
                <el-radio-button label="large">大</el-radio-button>
                <el-radio-button label="default" >中</el-radio-button>
                <el-radio-button label="small" >小</el-radio-button>
              </el-radio-group>
            </el-form-item>
          )}
          <el-form-item label="标签对齐方式">
            <el-radio-group v-model={target.value[state.platform].labelPosition} size="large">
              <el-radio-button name="left" label="left" />
              <el-radio-button name="top" label="top" />
              <el-radio-button name="right" label="right" />
            </el-radio-group>
          </el-form-item>
        </div>
      )
    }
  }
})
// <template>
//   <div>
//     <DeviceSwitch justify-content="center"></DeviceSwitch>
//     <el-form-item label="同步设置电脑和移动端" label-position="left">
//       <el-switch v-model="target.isSync"/>
//     </el-form-item>
//     <el-form-item label="组件尺寸" v-if="isPc">
//       <el-radio-group v-model="target[state.platform].size" size="large">
//         <el-radio-button label="large">大</el-radio-button>
//         <el-radio-button label="default" >中</el-radio-button>
//         <el-radio-button label="small" >小</el-radio-button>
//       </el-radio-group>
//     </el-form-item>
//     <el-form-item label="标签对齐方式">
//       <el-radio-group v-model="target[state.platform].labelPosition" size="large">
//         <el-radio-button name="left" label="left" />
//         <el-radio-button name="top" label="top" />
//         <el-radio-button name="right" label="right" />
//       </el-radio-group>
//     </el-form-item>
//     <el-form-item label="按钮">
//       <el-row :gutter="8">
//         <el-col>
//           <el-form-item label="文字">
//             <el-input></el-input>
//           </el-form-item>
//         </el-col>
//       </el-row>
//       <el-row :gutter="8">
//         <el-col :span="12">
//           <el-form-item label="颜色">
//             <el-color-picker
//               show-alpha
//             />
//           </el-form-item>
//         </el-col>
//         <el-col :span="12">
//           <el-form-item label="背景">
//             <el-color-picker
//               v-model="target[state.platform]."
//               show-alpha
//             />
//           </el-form-item>
//         </el-col>
//       </el-row>
//     </el-form-item>
//   </div>
// </template>
