package com.example.contactmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "*") // for frontend
public class ContactController {

  @Autowired
  private ContactRepository contactRepository;

  @GetMapping
  public List<Contact> getAllContacts() {
    return contactRepository.findAll();
  }

  @PostMapping
  public Contact createContact(@Valid @RequestBody Contact contact) {
    return contactRepository.save(contact);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
    return contactRepository.findById(id)
        .map(contact -> ResponseEntity.ok().body(contact))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Contact> updateContact(@PathVariable Long id, @Valid @RequestBody Contact contactDetails) {
    return contactRepository.findById(id)
        .map(contact -> {
          contact.setName(contactDetails.getName());
          contact.setPhoneNumber(contactDetails.getPhoneNumber());
          Contact updatedContact = contactRepository.save(contact);
          return ResponseEntity.ok().body(updatedContact);
        }).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteContact(@PathVariable Long id) {
    return contactRepository.findById(id)
        .map(contact -> {
          contactRepository.delete(contact);
          return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
  }
}