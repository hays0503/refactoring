'use server'
 
import { permanentRedirect } from 'next/navigation'
 
export async function main(id: string) {
  // Перенаправление на страницу по умолчанию русской версии   
  permanentRedirect(`/ru`)
}