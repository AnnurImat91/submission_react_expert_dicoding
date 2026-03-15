/* global cy, describe, beforeEach, it, expect */

describe('Skenario Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('harus menampilkan alert jika email atau password salah', () => {
    cy.get('input[type="email"]').type('email_salah@email.com')
    cy.get('input[type="password"]').type('passwordsalah')
    cy.get('button[type="submit"]').click()

    cy.on('window:alert', (str) => {
      expect(str).to.include('email or password is wrong')
    })
  })

  it('harus berhasil login dan dialihkan ke homepage dengan akun yang benar', () => {
    cy.get('input[type="email"]').type('test_akun_123@gmail.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('button[title="Buat Diskusi Baru"]').should('be.visible')
  })
})
