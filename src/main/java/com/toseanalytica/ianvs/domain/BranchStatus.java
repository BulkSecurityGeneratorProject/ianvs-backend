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
 * A BranchStatus.
 */
@Entity
@Table(name = "branch_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BranchStatus implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "branch_status")
    private String branchStatus;

    @OneToMany(mappedBy = "branchStatus")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Branch> branchStatuses = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranchStatus() {
        return branchStatus;
    }

    public BranchStatus branchStatus(String branchStatus) {
        this.branchStatus = branchStatus;
        return this;
    }

    public void setBranchStatus(String branchStatus) {
        this.branchStatus = branchStatus;
    }

    public Set<Branch> getBranchStatuses() {
        return branchStatuses;
    }

    public BranchStatus branchStatuses(Set<Branch> branches) {
        this.branchStatuses = branches;
        return this;
    }

    public BranchStatus addBranchStatus(Branch branch) {
        this.branchStatuses.add(branch);
        branch.setBranchStatus(this);
        return this;
    }

    public BranchStatus removeBranchStatus(Branch branch) {
        this.branchStatuses.remove(branch);
        branch.setBranchStatus(null);
        return this;
    }

    public void setBranchStatuses(Set<Branch> branches) {
        this.branchStatuses = branches;
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
        BranchStatus branchStatus = (BranchStatus) o;
        if (branchStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), branchStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BranchStatus{" +
            "id=" + getId() +
            ", branchStatus='" + getBranchStatus() + "'" +
            "}";
    }
}
