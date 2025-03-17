import tseslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import eslint from '@eslint/js'

export default [
  {
    ignores: ['node_modules', 'dist', 'public', '*.d.ts']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser
        /** 追加一些其他自定义全局规则 */
        // wx: true,
      }
    }
  },
  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      'no-undef': 'off',
      'vue/multi-word-component-names': 'off'
      // 在这里追加 vue 规则
    }
  },
  /**
   * typescript 规则
   */
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {}
  }
]
