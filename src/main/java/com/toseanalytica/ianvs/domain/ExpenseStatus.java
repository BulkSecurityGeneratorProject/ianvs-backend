package com.toseanalytica.ianvs.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ExpenseStatus.
 */
@Entity
@Table(name = "expense_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExpenseStatus implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "expense_status")
    private String expenseStatus;

    @OneToMany(mappedBy = "expenseStatus")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ExpenseUpload> expenseStatuses = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExpenseStatus() {
        return expenseStatus;
    }

    public ExpenseStatus expenseStatus(String expenseStatus) {
        this.expenseStatus = expenseStatus;
        return this;
    }

    public void setExpenseStatus(String expenseStatus) {
        this.expenseStatus = expenseStatus;
    }

    public Set<ExpenseUpload> getExpenseStatuses() {
        return expenseStatuses;
    }

    public ExpenseStatus expenseStatuses(Set<ExpenseUpload> expenseUploads) {
        this.expenseStatuses = expenseUploads;
        return this;
    }

    public ExpenseStatus addExpenseStatus(ExpenseUpload expenseUpload) {
        this.expenseStatuses.add(expenseUpload);
        expenseUpload.setExpenseStatus(this);
        return this;
    }

    public ExpenseStatus removeExpenseStatus(ExpenseUpload expenseUpload) {
        this.expenseStatuses.remove(expenseUpload);
        expenseUpload.setExpenseStatus(null);
        return this;
    }

    public void setExpenseStatuses(Set<ExpenseUpload> expenseUploads) {
        this.expenseStatuses = expenseUploads;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExpenseStatus expenseStatus = (ExpenseStatus) o;
        if (expenseStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expenseStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExpenseStatus{" +
            "id=" + getId() +
            ", expenseStatus='" + getExpenseStatus() + "'" +
            "}";
    }
}
